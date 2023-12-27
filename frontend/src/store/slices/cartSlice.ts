import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  total: number;
}

const initialState: cartState = {
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setTotal } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: { cart: cartState }) => state.cart;
