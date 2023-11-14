import { createSlice } from "@reduxjs/toolkit";

const perseShipingPrice = localStorage.getItem("ShippingPrice");
const shippingPrice = JSON.parse(perseShipingPrice);

const perseTotalCost = localStorage.getItem("TotalCost");
const totalPrice = JSON.parse(perseTotalCost);

const perseDiscount = localStorage.getItem("Discount");
const discount = JSON.parse(perseDiscount);

const shippingPriceInitialState = {
  shipping: shippingPrice || 0,
  totalCost: totalPrice || 0,
  discount: discount || 0
};

const shippingPriceSlice = createSlice({
  name: "shipping",
  initialState: shippingPriceInitialState,
  reducers: {
    addToShippingPrice: (state, action) => {
      const shippingPrice = action.payload;
      if (shippingPrice) {
        localStorage.setItem("ShippingPrice", JSON.stringify(shippingPrice));
      }
      const perseShippingPrice = localStorage.getItem("ShippingPrice");
      const getShippingPrice = JSON.parse(perseShippingPrice);
      state.shipping = getShippingPrice || 0;
    },


    calculatetTotalTotalCost: (state , action) => {
      const subTotalPrice = action.payload
      const shippingPrice = state.shipping
      const totalCost = parseInt(subTotalPrice) + parseInt(shippingPrice)
      localStorage.setItem("TotalCost" , JSON.stringify(totalCost))
      const parseTotalCost = localStorage.getItem("TotalCost")
      const getTotalCost = JSON.parse(parseTotalCost)
      state.totalCost = getTotalCost
    },
    promoDiscount: (state , action)=>{
      const discountPrice = action.payload
      localStorage.setItem("Discount" , JSON.stringify(discountPrice))
      state.discount = discountPrice

      const perseTotalCost = localStorage.getItem("TotalCost");
      const Price = JSON.parse(perseTotalCost);
      const totalPrice = parseInt(Price) - parseInt( discountPrice)
      localStorage.setItem("TotalCost" , JSON.stringify(totalPrice))
      state.totalCost = totalPrice

    },

    sendShipingInfoLocalSorage: (state , action) =>{
      const shippingInfo = action.payload
      localStorage.setItem("ShippingInfo", JSON.stringify(shippingInfo))

    },
    clearShippingTotalCostDiscount: (state) => {
      state.shipping = 0
      state.totalCost = 0
      state.discount = 0

    }

  },
});

export const { addToShippingPrice , calculatetTotalTotalCost ,  promoDiscount , sendShipingInfoLocalSorage , clearShippingTotalCostDiscount} = shippingPriceSlice.actions;
export default shippingPriceSlice.reducer;
