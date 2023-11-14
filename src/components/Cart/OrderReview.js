import React from "react";
import Review from "./Review";

const OrderReview = () => {
  return (
    <div className="my-5 pt-5 ">
      <div className="container mt-5">
        <div data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine" className="card shippinContainer">
          <div className="">
            {/* <div>

            </div> */}
            {/* <span className="personal px-4 py-">Personal Info</span>
            <span className="personal">Order Review</span>
            <span>Payment</span> */}
            <h5>STEP NO TWO</h5>
          </div>
          <div className="mt-5">
            <Review />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
