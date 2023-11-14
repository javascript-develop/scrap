import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartClear } from "../Redux/Slice/cartSlice";
import { clearShippingTotalCostDiscount } from "../Redux/Slice/shippingPriceSlice";

const PaymentSuccess = () => {
  const orderItems = useSelector((state) => state.cart.cart);
  const parseInfo = localStorage.getItem("ShippingInfo");
  const shippingInfo = JSON.parse(parseInfo);
  const navigate = useNavigate();

  const user = localStorage.getItem("userId");
  const subTotalPrice = parseInt(localStorage.getItem("SubTotalPrice"));
  // const shippingPrice = parseInt(localStorage.getItem("ShippingPrice"));
  const totalPrice = parseInt(localStorage.getItem("TotalCost"));
  const discount = parseInt(localStorage.getItem("Discount"));

  const paymentId = Math.floor(100000000 + Math.random() * 900000000);
  const disPatch = useDispatch();
  // const [user] = useAuthState(auth)
  // console.log(user?.email)


  useEffect(() => {
    const data = {
      shippingInfo,
      orderItems,


    };
    console.log(data)

    fetch(`http://localhost:5000/api/v1/order/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("UserToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // localStorage.removeItem("SubTotalPrice");
          // // localStorage.removeItem("ShippingPrice");
          // localStorage.removeItem("TotalCost");
          // localStorage.removeItem("Discount");
          // localStorage.removeItem("Cart");
          // disPatch(cartClear());
          // disPatch(clearShippingTotalCostDiscount());
          // disPatch(clearSubTotal());
        }
      });

    const paymentInfo = {
      orderItems,
      // name: user?.displayName,
      // email: user?.email,
      paidPrice: 30,
      shippingInfo,
      emails: user

    };
    fetch(`http://localhost:5000/api/v1/order/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("UserToken")}`,
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        localStorage.removeItem("SubTotalPrice");
        // localStorage.removeItem("ShippingPrice");
        localStorage.removeItem("TotalCost");
        localStorage.removeItem("Discount");
        localStorage.removeItem("Cart");
        disPatch(cartClear());
        disPatch(clearShippingTotalCostDiscount());
        // disPatch(clearSubTotal());
      });
  }, []);

  console.log(user);
  return (
    <div className="my-5">
      <div className="contianer">
        <div className="w-50  mx-auto card p-5">
          <img
            className="img-fluid rounded"
            src="/picture/payment.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
