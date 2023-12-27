import { Payment } from "../types";
import { baseApi } from "./baseApi";

export interface createPaymentResponse {
  success: boolean;
  data: Payment;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation({
      query: ({ token, bookingId, amount }) => ({
        url: `payment/`,
        method: "POST",
        body: { bookingId: bookingId, amount: amount },
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response: createPaymentResponse) => response,
    }),
  }),

  overrideExisting: false,
});

export const { useCreatePaymentMutation } = paymentApi;
