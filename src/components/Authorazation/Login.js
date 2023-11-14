import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Utilites/Loading"
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { sendPasswordResetEmail } from "firebase/auth";
import { BiShowAlt } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
const Login = () => {
  const navigete = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, users, loading, errorss] =
    useSignInWithEmailAndPassword(auth);
  const [user, loadings, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(data);
        if (result.success) {
          await signInWithEmailAndPassword(data.email, data.password);
          // toast.success(data.message);
          localStorage.setItem("Token", result?.token);
          localStorage.setItem("userId", result.user._id);
          // navigate("/login");
        } else {
          toast.error(result.message);
        }
      });
    console.log(data);
  };

  if (loading || loadings) {
    return <Loading />
  }

  if (user) {
    navigate(from, { replace: true });
  }

  let errorMessage;
  if (error || errorss) {
    errorMessage = error?.message || errorss?.message;
    // toast.error(errorMessage);

  }
  const passwordResetHendeler = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.success("Reset password send email");
      handleClose();
    });
  };
  return (
    <div data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine" className="my-5 container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card loginContainer shadow-sm mx-auto p-4 ">
          <div>
            <h3 className="text-center">SIGN IN</h3>

            <div data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="300" className="mt-4 position-relative">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is Required",
                  },
                })}
                type="email"
                placeholder="Email"
                className="EmailInput ps-5"
                name="email"
                id="email"
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </label>
              <div className="pt-4 mt-1 py-0 px-2 position-absolute top-0 ">
                <span className="icons pt-1">
                  <AiOutlineMail />
                </span>
              </div>
            </div>

            <div className="mt-4 position-relative">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is Required",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="EmailInput px-5"
                name="password"
                id="password"
              />
              {
                showPassword ? <div onClick={() => setShowPassword(!showPassword)} className=" py-0 px-2 showPassword">
                  <span className="ics pt-1">
                    <BiShowAlt />
                  </span>
                </div>
                  :
                  <div onClick={() => setShowPassword(!showPassword)} className=" py-0 px-2 showPassword">
                    <span className="ics pt-1">
                      <GoEyeClosed />
                    </span>
                  </div>
              }
              <label class="label">
                {errors.password?.type === "required" && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </label>
              <div className=" py-0 px-2 position-absolute top-50 ">
                <span className="icons pt-1">
                  <RiLockPasswordFill />
                </span>
              </div>
            </div>

            <div>
              <div className="mt-3 ">

                <input
                  className="btn btn-primary w-100"
                  type="submit"
                  value="Login"
                />
              </div>

              <p className="text-danger">{errorMessage} </p>
              <p onClick={() => handleShow()} className=" text-end text-primary mt-2 pinter">Forgot Password?</p>
            </div>
          </div>
        </div>
      </form>

      <div>
        <p className="text-center mt-2"><span className="me-2">Not a member yet?</span>
          <span onClick={() => navigete("/signUp")} className="text-primary pinter ">
            Sign Up
          </span>{" "}
          and enjoy our deals!</p>

      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="p-3 ">
          <div className="mt-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="EmailInput"
              name="email"
              id="email"
              required
            />
          </div>

          <div className=" d-flex justify-content-center mt-2">
            <Button
              disabled={!email}
              // variant="secondary"
              className="btn btn-warning px-5 w-full"
              onClick={() => passwordResetHendeler()}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;