import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBooking,
  setCheckInDate,
  setCheckOutDate,
} from "../../store/slices/bookingSlice";

const DateInput = () => {
  const { checkInDate, checkOutDate } = useSelector(selectBooking);

  const minDate = new Date().toISOString().split("T")[0];
  const minTommorow = new Date();
  minTommorow.setDate(minTommorow.getDate() + 1);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      const tommorow = new Date();
      tommorow.setDate(tommorow.getDate() + 1);
      dispatch(setCheckInDate(new Date().toISOString()));
      dispatch(setCheckOutDate(tommorow.toISOString()));
    };
  }, [dispatch]);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isCheckIn: boolean,
  ) => {
    if (isCheckIn) {
      dispatch(setCheckInDate(new Date(event.target.value).toISOString()));
    } else {
      dispatch(setCheckOutDate(new Date(event.target.value).toISOString()));
    }
  };

  return (
    <div className="border border-black rounded-lg flex mt-6">
      <div className="border-r border-black p-4">
        <label
          htmlFor="date-checkin"
          className="uppercase font-medium font-primary">
          check-in
        </label>
        <input
          type="date"
          id="date-checkin"
          min={minDate}
          value={checkInDate.split("T")[0]}
          onChange={e => handleDateChange(e, true)}
        />
      </div>
      <div className="p-4">
        <label
          htmlFor="date-checkout"
          className="uppercase font-medium font-primary">
          check-out
        </label>
        <input
          type="date"
          id="date-checkout"
          min={minTommorow.toISOString().split("T")[0]}
          value={checkOutDate.split("T")[0]}
          onChange={e => handleDateChange(e, false)}
        />
      </div>
    </div>
  );
};

export default DateInput;
