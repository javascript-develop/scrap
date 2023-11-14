import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearShippingTotalCostDiscount, promoDiscount } from "../Redux/Slice/shippingPriceSlice";
import { cartClear } from "../Redux/Slice/cartSlice";
import swal from "sweetalert";
import CheckoutForm from "./CheckoutForm";
const Review = () => {
    const cart = useSelector((state) => state.cart.cart);
    const orderItems = useSelector((state) => state.cart.cart);
    const subtotal = useSelector((state) => state.subTotal.subTotal);
    const shipping = useSelector((state) => state.shipping.shipping);
    const [promoCode, setPromoCode] = useState("");
    const [isDiscount, setIsDiscountCode] = useState(false)
    // const totalCost = useSelector((state) => state.shipping.totalCost);
    const discount = useSelector((state) => state.shipping.discount);
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const totalCostFromLocalStorage = localStorage.getItem("TotalCost") || 0;
    const [totalCost, setTotalCost] = useState(totalCostFromLocalStorage || 30);
    const parseInfo = localStorage.getItem("ShippingInfo");
    const shippingInfo = JSON.parse(parseInfo);
    const user = localStorage.getItem("userId");
    const Discount = parseInt(localStorage.getItem("Discount"));
    const totalPrice = parseInt(localStorage.getItem("TotalCost"));
    const applayPromoCodeHendeler = () => {
        console.log(promoCode.toLowerCase());
        fetch(
            `http://localhost:5000/api/v1/courses/course/validatePromo/${promoCode}`,
            {
                method: "Get",
                headers: {
                    "Content-type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log("ad", data);
                    // setTotalCost(totalCost - (totalCost * data.amount) / 100);
                    const tk = (data.discount.amount * totalCost) / 100;
                    setTotalCost(totalCost - tk);
                    setIsDiscountCode(true);
                    setPromoCode("");
                    toast.success(
                        `congaculation you have ${data?.discount?.amount}% Discount`
                    );
                } else {
                    toast.error("Sorry Promo code Doesn't Match");
                    setPromoCode("");
                }
            });
    };


    const getFreeCourseAccessHandler = async () => {
        const data = {
            shippingInfo,
            orderItems,
        };

        try {
            // Call the first API
            const res1 = await fetch(`http://localhost:5000/api/v1/order/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
                body: JSON.stringify(data),
            });

            // Handle errors if the response is not in the expected format
            if (!res1.ok) {
                throw new Error(`HTTP error! Status: ${res1.status}`);
            }

            const data1 = await res1.json();
            console.log('Response Data:', data1);

            // Check if the first API call was successful
            console.log(orderItems, "orderdetails")
            if (data1.success) {
                const paymentInfo = {
                    orderItems,
                    paidPrice: totalCost,
                    shippingInfo,
                    emails: user,
                };

                // Call the second API
                const res2 = await fetch(`http://localhost:5000/api/v1/order/post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                    body: JSON.stringify(paymentInfo),
                });

                // Handle errors if the response is not in the expected format
                if (!res2.ok) {
                    throw new Error(`HTTP error! Status: ${res2.status}`);
                }

                const data2 = await res2.json();

                // Check if the second API call was successful
                if (data2.success) {
                    // Do something if both API calls were successful
                    if (localStorage.getItem("SubTotalPrice")) {
                        localStorage.removeItem("SubTotalPrice");
                        console.log("SubTotalPrice removed from localStorage");
                    }

                    if (localStorage.getItem("TotalCost")) {
                        localStorage.removeItem("TotalCost");
                        console.log("TotalCost removed from localStorage");
                    } else {
                        console.log("TotalCost was not found in localStorage");
                    }

                    if (localStorage.getItem("Discount")) {
                        localStorage.removeItem("Discount");
                        console.log("Discount removed from localStorage");
                    }

                    if (localStorage.getItem("Cart")) {
                        localStorage.removeItem("Cart");
                        console.log("Cart removed from localStorage");
                    }

                    disPatch(cartClear());
                    disPatch(clearShippingTotalCostDiscount());
                    swal({
                        title: 'Congratulations!',
                        text: 'All Courses Access Successful',
                        icon: 'success',
                        button: 'OK',
                    });
                } else {
                    // Handle error if the second API call was not successful
                    throw new Error(`API error! Message: ${data2.message}`);
                }
            } else {
                // Handle error if the first API call was not successful
                throw new Error(`API error! Message: ${data1.message}`);
            }
        } catch (error) {
            console.log(error);
            // Handle errors here
            swal({
                title: 'Error!',
                text: 'An error occurred while processing your request. Please try again later.',
                icon: 'error',
                button: 'OK',
            });
        }
    };

    return (
        <div className="my-1">
            <h5>Pay Your Yearly Subscription Fee</h5>
            <div className="cardTop mt-2"></div>
            <div className="row mt-1">
                <div className="col-lg-4 col-md-4">
                    <b className="fw-bold fs-5">Total Cost:</b>
                </div>
                <div className="col-lg-4 col-md-4"></div>
                <div className="col-lg-4 col-md-4">
                    <p className="fs-2 fw-bold"><span>$</span>{totalCost} USD</p>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-lg-4 col-md-4"></div>
                <div className="col-lg-4 col-md-4 text-center">
                    <p className="py-0 fs-5 fw-bold text-secondary">Have a Promo Code?</p>
                    <div className="input-group">
                        <input
                            onChange={(e) => setPromoCode(e.target.value)}
                            value={promoCode}
                            className="form-control inputFlied"
                            type="text"
                            placeholder="Enter Your Promo Code"
                        />
                        <button
                            disabled={!promoCode}
                            enabled={discount}
                            onClick={() => applayPromoCodeHendeler()}
                            className="btn btn-warning"
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4"></div>
            </div>

            <div className="my-5 d-flex justify-content-center">
                {parseInt(totalCost) == 0 ? (
                    <button onClick={() => getFreeCourseAccessHandler()} className="btn btn-warning px-5"
                        style={{
                            background: '#008000', // update the background color to green
                            color: '#fff',
                            fontSize: '1.2rem',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '4px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >Access All Courses</button>
                ) : (
                    <CheckoutForm totalCost={totalCost} />
                )}
            </div>
        </div>
    );
};

export default Review;