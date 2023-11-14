import { createSlice } from "@reduxjs/toolkit";
const clientSecretInitialState = {
  clientSecret: "",
};

const clientSecretSlice = createSlice({
  name: "clientSecret",
  initialState: clientSecretInitialState,
  reducers: {
    addToSecretClient: (state, action) => {
      const scret = action.payload;
      state.clientSecret = scret;
    },
  },
});

export const { addToSecretClient } = clientSecretSlice.actions;
export default clientSecretSlice.reducer;
