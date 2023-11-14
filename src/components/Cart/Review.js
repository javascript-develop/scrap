import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { cartClear } from "../Redux/Slice/cartSlice";
import { clearShippingTotalCostDiscount, promoDiscount } from "../Redux/Slice/shippingPriceSlice";

const CheckoutForm = ({ totalCost }) => {
  const cart = useSelector((state) => state.cart.cart)
  const parseInfo = localStorage.getItem("ShippingInfo");
  const shippingInfo = JSON.parse(parseInfo);
  const orderItems = useSelector((state) => state.cart.cart);
  const user = localStorage.getItem("userId");
  const [payment, setPayment] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const disPatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  async function handleSubmit(event) {
    event.preventDefault();
    setPayment(true);
    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      const errorMessage = error.message;
      setMessage(errorMessage);
      setIsLoading(false);
    } else {
      const response = await fetch(
        `http://localhost:5000/pay?price=${totalCost}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
          body: JSON.stringify({
            amount: totalCost,
            paymentMethodId: paymentMethod.id,
          }),
        }
      );
      if (response.ok) {
        setMessage("Payment successful!");
        getFreeCourseAccessHandler();
        const cardElement = elements.getElement(CardElement);
        cardElement.clear();
      } else {
        setMessage("Payment failed.");
        swal({
          title: "Sorry payment is failed",
          text: "warning! please put the right information",
          icon: "warning",
          dangerMode: true,
        })
        const cardElement = elements.getElement(CardElement);
        cardElement.clear();
      }
      setIsLoading(false);
    }
  }
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
      const data1 = await res1.json();

      // Check if the first API call was successful
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
        const data2 = await res2.json();

        // Check if the second API call was successful
        if (data2.success) {
          // Do something if both API calls were successful
          swal({
            title: 'Congratulations!',
            text: 'All Courses Access Successful',
            icon: 'success',
            button: 'OK',
          });
          localStorage.removeItem("SubTotalPrice");
          localStorage.removeItem("TotalCost");
          localStorage.removeItem("Discount");
          localStorage.removeItem("Cart");
          disPatch(cartClear());
          disPatch(clearShippingTotalCostDiscount());
        }
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
    <div className="card lg:w-2/3 w-full  m-auto  border p-3">
      <div class="">
        <div class="p-2">
          <div className="pb-4 border-b border-gray-100">
            <h5 className="font-semibold text-cente cardtt text-secondary">
              Payment Now
            </h5>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement onChange={(e) => setPaymentMethod(e)} />
        {message && <div className="text-center">{message}</div>}
        <button type="submit" disabled={!paymentMethod || !totalCost} className="btn btn-primary mt-4" style={{ backgroundColor: "#6c63ff" }}>
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Stripe logo" style={{ height: 25, width: 20, marginRight: 10 }} />
          Confirm pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;