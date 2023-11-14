import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { sendShipingInfoLocalSorage } from "../Redux/Slice/shippingPriceSlice";

const Shipping = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const setStore = {
      name: data.name,
      email: user?.email,
      address: data.address,
      country: data.country,
    };
    disPatch(sendShipingInfoLocalSorage(setStore));
    navigate("/myCart/chackout/review");
  };

  return (
    <>
      <h5 className="text-center fs-3 fw-semibold mb-5">Personal Information</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6 mt-2">
            <span className="label">Name</span>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
              placeholder="Enter Your Name"
              className="shippingInput"
              type="text"
              name="name"
              id="name"
            />
            <label class="label">
              {errors.name?.type === "required" && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </label>
          </div>
          <div className="col-lg-6 mt-2">
            <span className="label">Email & Username</span>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is Required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid Email",
                },
              })}
              placeholder="Enter Your Email"
              className="shippingInput"
              name="email"
              id="email"
            />
            <label class="label">
              {errors.email?.type === "required" && (
                <span className="text-danger">{errors.email.message}</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </label>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-lg-6 mt-2">
            <span className="label">Address</span>
            <input
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is Required",
                },
              })}
              placeholder="Enter Address"
              className="shippingInput"
              type="text"
              name="address"
              id="address"
            />
            <label class="label">
              {errors.address?.type === "required" && (
                <span className="text-danger">{errors.address.message}</span>
              )}
            </label>
          </div>
          <div className="col-lg-6 mt-2">
            <span className="label">State</span>
            <input
              {...register("country", {
                required: {
                  value: true,
                  message: "Country is Required",
                },
              })}
              placeholder="Enter Your Country"
              className="shippingInput"
              name="country"
              id="country"
            />
            <label class="label">
              {errors.country?.type === "required" && (
                <span className="text-danger">{errors.country.message}</span>
              )}
            </label>
          </div>
        </div>
        {/* <div className="row mt-1">
          <div className="col-lg-6 mt-2">
            <span className="label">City</span>
            <input
              {...register("city", {
                required: {
                  value: true,
                  message: "City is Required",
                },
              })}
              placeholder="Enter Your City"
              className="shippingInput"
              type="text"
              name="city"
              id="city"
            />
            <label class="label">
              {errors.city?.type === "required" && (
                <span className="text-danger">{errors.city.message}</span>
              )}
            </label>
          </div>
          <div className="col-lg-6 mt-2">
            <span className="label">Phone</span>
            <input
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Phone Number is Required",
                },
              })}
              placeholder="Enter Your Phone"
              className="shippingInput"
              name="phoneNo"
              id="phoneNo"
            />
            <label class="label">
              {errors.phoneNo?.type === "required" && (
                <span className="text-danger">{errors.phoneNo.message}</span>
              )}
            </label>
          </div>
        </div> */}
        <div className="row mt-3">
          {/* <div className="col-lg-6 ">
            <span className="label">Pin Code</span>
            <input
              {...register("pinCode", {
                required: {
                  value: true,
                  message: "PinCode is Required",
                },
              })}
              placeholder="Enter Pincode example 12345"
              className="shippingInput"
              type="text"
              name="pinCode"
              id="pinCode"
            />
            <label class="label">
              {errors.pinCode?.type === "required" && (
                <span className="text-danger">{errors.pinCode.message}</span>
              )}
            </label>
          </div> */}
          {/* <div className="col-lg-6">
          <span className="label">Phone</span>
          <input
           {...register("phoneNo", {
            required: {
              value: true,
              message: "Phone Number is Required",
            },
          })}
            placeholder="Enter Your Phone"
            className="shippingInput"
            name=""
            id=""
          />
          <label class="label">
              {errors.phoneNo?.type === "required" && (
                <span className="text-danger">{errors.phoneNo.message}</span>
              )}
            </label>
        </div> */}
        </div>

        <div className="my-5  d-flex justify-content-end ">
          <input
            type="submit"
            value="Confirm Subscribtion"
            className=" btn btn-warning px-5"
          />
        </div>
      </form>
    </>
  );
};

export default Shipping;
