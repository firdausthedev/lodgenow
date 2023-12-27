export const calculateNumberOfNights = (
  checkInDate: string,
  checkOutDate: string,
): number => {
  const newCheckInDate = new Date(checkInDate);
  const newCheckOutDate = new Date(checkOutDate);

  const timeDifference = newCheckOutDate.getTime() - newCheckInDate.getTime();
  const numberOfNights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return numberOfNights;
};

export const convertDateToString = (date: Date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const dateString = `${year}/${month}/${day}`;
  return dateString;
};
