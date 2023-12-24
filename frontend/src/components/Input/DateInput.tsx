import React, { useState } from "react";
const DateInput = () => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  const [checkOutDate, setCheckOutDate] = useState<Date>(tommorow);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isCheckIn: boolean,
  ) => {
    if (isCheckIn) {
      setCheckInDate(new Date(event.target.value));
    } else {
      setCheckOutDate(new Date(event.target.value));
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
          min={checkInDate.toISOString().split("T")[0]}
          value={checkInDate.toISOString().split("T")[0]}
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
          min={checkOutDate.toISOString().split("T")[0]}
          value={checkOutDate.toISOString().split("T")[0]}
          onChange={e => handleDateChange(e, false)}
        />
      </div>
    </div>
  );
};

export default DateInput;
