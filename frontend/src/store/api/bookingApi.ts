import { Booking } from "../types";
import { baseApi } from "./baseApi";

export interface getAllBookingResponse {
  success: boolean;
  data: Booking[];
}

export interface getOneBookingResponse {
  success: boolean;
  data: Booking;
}

const bookingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllBooking: build.query({
      query: (token: string | null) => ({
        url: "booking/",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllBookingResponse) => response,
    }),
    getOneBooking: build.query<getOneBookingResponse, [string | null, string]>({
      query: ([token, id]) => ({
        url: `booking/${id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getOneBookingResponse) => response,
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllBookingQuery, useGetOneBookingQuery } = bookingApi;
