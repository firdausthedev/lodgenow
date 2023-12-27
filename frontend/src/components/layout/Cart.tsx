import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCart, setTotal } from "../../store/slices/cartSlice";
import { selectUser } from "../../store/slices/userSlice";
import { useGetAllBookingQuery } from "../../store/api/bookingApi";
import Spinner from "./Spinner";

const Cart = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { total } = useSelector(selectCart);

  const { token } = useSelector(selectUser);
  const { data: bookings, isLoading, isError } = useGetAllBookingQuery(token);

  useEffect(() => {
    if (!isLoading && !isError && bookings) {
      const bookingWithoutPayment = bookings.data.filter(
        item => item.payment === null,
      );
      dispatch(setTotal(bookingWithoutPayment.length));
    }
  }, [dispatch, bookings, isLoading, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !bookings) {
    return (
      <Link className="font-normal font-secondary relative" to="/cart">
        <span className="absolute -top-2 -right-3 bg-accent text-white rounded-full text-xs px-2 py-1 font-secondary">
          0
        </span>
        <FaCartShopping className="text-2xl text-gray-700" />
      </Link>
    );
  }

  return (
    <Link
      reloadDocument
      className="font-normal font-secondary relative"
      to="/cart">
      <span className="absolute -top-2 -right-3 bg-accent text-white rounded-full text-[0.55rem] font-bold px-2 py-1 font-secondary">
        {total}
      </span>
      <FaCartShopping className="text-2xl text-gray-700" />
    </Link>
  );
};

export default Cart;
