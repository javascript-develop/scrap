import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from '../Slice/proudctSlice'
import singleCourseReducer from "../Slice/singleCourseSlice"
import cartReducer from "../Slice/cartSlice"
import subtotalReduce from "../Slice/subTotalSlice"
import shppingPriceReducer from "../Slice/shippingPriceSlice"
import clientSecretReducer from "../Slice/clientScrect"
import createUserReducer from "../Slice/createUserSlice"
export default configureStore({
      reducer: {
          courses: coursesReducer,
          course: singleCourseReducer,
          user: createUserReducer,
          cart:  cartReducer,
          subTotal: subtotalReduce,
          shipping: shppingPriceReducer,
          clientSecret: clientSecretReducer,
      //     orders: manageOrderReducer,
      //     users: userReducer,
      //     admins: adminsReducer,
      //     avatar: avatarProfileReducer
      },
    })