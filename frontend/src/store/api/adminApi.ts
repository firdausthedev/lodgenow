import { Property } from "../types";
import { baseApi } from "./baseApi";

interface signInResponse {
  success: boolean;
  token: string;
  message: string;
}

interface getDashboardResponse {
  success: boolean;
  data: {
    properties: number;
    agents: number;
    bookings: number;
    payments: number;
    reviews: number;
    users: number;
    admin_username: string;
  };
}

interface getAllPropertyResponse {
  success: boolean;
  data: Property[];
}

export interface getAllBookingAdminData {
  id: string;
  checkIn: Date;
  checkOut: Date;
  propertyId: string;
  userId: string;
  user: {
    username: string;
  };
  property: {
    name: string;
  };
}

export interface getAllBookingResponse {
  success: boolean;
  data: getAllBookingAdminData[];
}

interface getAllPaymentResponse {
  success: boolean;
  data: getAllPaymentAdmin[];
}

export interface getAllPaymentAdmin {
  id: string;
  amount: number;
  status: string;
  bookingId: string;
  booking: {
    property: {
      name: string;
    };
    user: {
      username: string;
    };
  };
}

export interface getAllUserData {
  username: string;
  id: string;
}

interface getAllUserResponse {
  success: boolean;
  data: getAllUserData[];
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signInAdmin: build.mutation({
      query: ({ username, password }) => ({
        url: `admin/`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      transformResponse: (response: signInResponse) => response,
    }),
    getDashboard: build.query({
      query: token => ({
        url: `admin/dashboard`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getDashboardResponse) => response.data,
    }),
    getAllPropertyAdmin: build.query({
      query: token => ({
        url: `admin/property`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllPropertyResponse) => response.data,
    }),
    getAllBookingAdmin: build.query({
      query: token => ({
        url: `admin/booking`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllBookingResponse) => response.data,
    }),
    getAllPaymentAdmin: build.query({
      query: token => ({
        url: `admin/payment`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllPaymentResponse) => response.data,
    }),
    getAllUserAdmin: build.query({
      query: token => ({
        url: `admin/user`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: getAllUserResponse) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInAdminMutation,
  useGetDashboardQuery,
  useGetAllPropertyAdminQuery,
  useGetAllBookingAdminQuery,
  useGetAllPaymentAdminQuery,
  useGetAllUserAdminQuery,
} = userApi;
