import { createSlice } from "@reduxjs/toolkit";
import { calculateNumberOfNights } from "../../components/utils/booking";

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
      const numberOfNights = calculateNumberOfNights(
        action.payload,
        state.checkOutDate,
      );
      if (numberOfNights < 1) {
        state.error = "Check-in date must be before check-out date";
      } else {
        state.error = "";
        state.checkInDate = action.payload;
      }
    },
    setCheckOutDate: (state, action) => {
      const numberOfNights = calculateNumberOfNights(
        state.checkInDate,
        action.payload,
      );
      if (numberOfNights < 1) {
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
