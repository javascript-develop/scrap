import React from "react";
import Shipping from "./Shipping";

const Chackout = () => {
  return (
    <div className="my-5 pt-5">
      <div className="container pt-5">
        <div data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine" className="card   shippinContainer">
          {/* <div className="paymentStrip d-flex  gap-5 rounded border w-50 ">
            <span className="personal px-4 py-">Personal Info</span>
            <span>Order Review</span>
            <span>Payment</span>
          </div> */}
          <h5>STEP NO ONE</h5>
          <div className="mt-5">
            <Shipping />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chackout;
