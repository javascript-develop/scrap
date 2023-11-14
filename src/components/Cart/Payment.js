import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToSecretClient } from "../Redux/Slice/clientScrect";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L1nmNCGpaTt0RU8npNSNITrjLTAUDjwjX275RD6RDk5SGoYi1H1zLKxAis8OFp4C0PxQBT2L5c0L0VsTI9ewqGl00dT2UHEXy"
);
const Payment = () => {
  const navigate = useNavigate();

  const clientSecret = useSelector((state) => state.clientSecret.clientSecret);
  const disPatch = useDispatch();
  const totalPrice = parseInt(localStorage.getItem("TotalCost"));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/v1/order/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("UserToken")}`,
      },
      body: JSON.stringify({ price: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => disPatch(addToSecretClient(data.clientSecrets)));
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="my-5">
      <div className="container">
        <div className="card   shippinContainer">
          <div className="">
            {/* <div>

            </div> */}
            {/* <span className="personal px-4 py-">Personal Info</span>
            <span className="personal">Order Review</span>
            <span className="personal px-4">Payment</span> */}
            <h5>STEP NO THREE</h5>
          </div>
          <div className="mt-5">
            {/* <Review /> */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
