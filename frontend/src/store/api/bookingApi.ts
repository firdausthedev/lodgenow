import { Booking } from "../types";
import { baseApi } from "./baseApi";

export interface getAllBookingResponse {
  success: boolean;
  data: Booking[];
}

const bookingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllBooking: build.query({
      query: token => ({
        url: "booking/",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllBookingResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllBookingQuery } = bookingApi;
