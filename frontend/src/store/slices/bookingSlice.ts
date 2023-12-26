import { createSlice } from "@reduxjs/toolkit";

interface bookingState {
  checkInDate: string;
  checkOutDate: string;
  error: string;
}

const tommorow = new Date();
tommorow.setDate(tommorow.getDate() + 1);

const initialState: bookingState = {
  checkInDate: new Date().toISOString(),
  checkOutDate: tommorow.toISOString(),
  error: "",
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCheckInDate: (state, action) => {
      const checkInDate = new Date(action.payload);
      const checkOutDate = new Date(state.checkOutDate);
      if (checkInDate.getTime() > checkOutDate.getTime()) {
        state.error = "Check-in date must be before check-out date";
      } else {
        state.error = "";
        state.checkInDate = action.payload;
      }
    },
    setCheckOutDate: (state, action) => {
      const checkInDate = new Date(state.checkInDate);
      const checkOutDate = new Date(action.payload);
      if (checkOutDate.getTime() < checkInDate.getTime()) {
        state.error = "Check-out date must be after check-in date";
      } else {
        state.error = "";
        state.checkOutDate = action.payload;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCheckOutDate, setCheckInDate, setError } =
  bookingSlice.actions;

export default bookingSlice.reducer;

export const selectBooking = (state: { booking: bookingState }) =>
  state.booking;
