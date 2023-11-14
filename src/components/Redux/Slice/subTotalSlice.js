import { createSlice } from "@reduxjs/toolkit";
const perseSubTotal = localStorage.getItem("SubTotalPrice");
const subtotal = JSON.parse(perseSubTotal);

const subTotalInitialState = {
  subTotal: subtotal || 0,
};

const subTotalPriceSlice = createSlice({
  name: "subTotal",
  initialState: subTotalInitialState,
  reducers: {
    addToSbTotal: (state, action) => {
      const cart = action.payload;
      const totalPrice = cart?.map((c) => c.totalPrice);

      if (cart.length > 0) {
        const reducer = (accumulator, curr) => accumulator + curr;
        const subtotalPrice = totalPrice?.reduce(reducer);
        localStorage.setItem("SubTotalPrice", JSON.stringify(subtotalPrice));
      } else {
        localStorage.setItem("SubTotalPrice", JSON.stringify(0));
      }
      const perseSubTotal = localStorage.getItem("SubTotalPrice");
      const subtotal = JSON.parse(perseSubTotal);
      state.subTotal = subtotal;
    },
  },
  getToSubTotal: (state) => {
      const perseCart = localStorage.getItem("SubTotalPrice");
      const getCart = JSON.parse(perseCart);
      state.cart = getCart || 0;
    },
    clearSubTotal: (state) => {
      state.subTotal = 0

    }
});

export const { addToSbTotal, getToSubTotal , clearSubTotal} = subTotalPriceSlice.actions;
export default subTotalPriceSlice.reducer;
