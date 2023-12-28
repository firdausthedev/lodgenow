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
  }),
  overrideExisting: false,
});

export const { useSignInAdminMutation, useGetDashboardQuery } = userApi;
