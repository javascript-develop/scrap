import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Authorazation/Login";
import Register from "./components/Authorazation/Register";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Chackout from "./components/Cart/Chackout";
import OrderReview from "./components/Cart/OrderReview";
import Payment from "./components/Cart/Payment";
import RequreAuth from "./components/Authorazation/RequreAuth";
import PaymentSuccess from "./components/Cart/PaymentSuccess";
import PaymentCancle from "./components/Cart/PaymentCancle";
// import User from "./components/Dashboard/User";
import RequreAdmin from "./components/Authorazation/RequreAdmin";
import UserInterface from "./components/Youtube/UserInterface";
function App() {
  return (
    <div className="">
      {/* <Navber /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<Register />}></Route>
        <Route path="/myCart" element={<Cart />}></Route>


        <Route
          path="/myCart/chackout"
          element={
            <RequreAuth>
              <Chackout />
            </RequreAuth>
          }
        ></Route>
        <Route path="/myCart/chackout/review" element={<OrderReview />}></Route>
        <Route
          path="/myCart/chackout/review/payment"
          element={
            <RequreAuth>
              <Payment />
            </RequreAuth>
          }
        ></Route>
        <Route
          path="/myCart/chackout/review/payment/success"
          element={<PaymentSuccess />}
        ></Route>
        <Route
          path="/myCart/chackout/review/payment/fail"
          element={<PaymentCancle />}
        >
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;