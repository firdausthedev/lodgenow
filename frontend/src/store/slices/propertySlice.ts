import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: [],
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
});

export default propertySlice.reducer;
