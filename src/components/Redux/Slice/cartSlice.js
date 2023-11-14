import { createSlice } from "@reduxjs/toolkit";
const perseCart = localStorage.getItem("Cart");
const getCart = JSON.parse(perseCart);
const cartInitialState = {
  cart: getCart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload) {
        // state.cart.push(action.payload);
        state.cart = action.payload
        const saveToLocalStorage = JSON.stringify(state.cart);
        localStorage.setItem("Cart", saveToLocalStorage);
      }
    },

    getToCart: (state) => {
      const perseCart = localStorage.getItem("Cart");
      const getCart = JSON.parse(perseCart);
      state.cart = getCart || [];
    },
    deleteToCart: (state, action) => {
      const id = action.payload;

      const deletedCart = state.cart.filter((c) => c.id !== id);
      const saveToLocalStorage = JSON.stringify(deletedCart);
      localStorage.setItem("Cart", saveToLocalStorage);
      state.cart = deletedCart;
    },
    cartClear: (state) =>{
      state.cart = []

    }
  },
});

export const { addToCart, getToCart, deleteToCart ,  cartClear  } = cartSlice.actions;
export default cartSlice.reducer;
