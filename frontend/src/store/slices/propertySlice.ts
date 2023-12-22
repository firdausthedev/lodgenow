import { createSlice } from "@reduxjs/toolkit";

interface PropertyState {
  propertyId: string;
}

const initialState: PropertyState = {
  propertyId: "",
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },
  },
});

export const { setPropertyId } = propertySlice.actions;

export default propertySlice.reducer;

export const selectProperty = (state: { property: PropertyState }) =>
  state.property;
