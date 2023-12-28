import { baseApi } from "./baseApi";

export interface postUserResponse {
  success: boolean;
  token: string;
  message: string;
  errCode: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signInUser: build.mutation({
      query: ({ username, password }) => ({
        url: `user/signin`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      transformResponse: (response: postUserResponse) => response,
    }),
    createUser: build.mutation({
      query: ({ username, password }) => ({
        url: `user`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      transformResponse: (response: postUserResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useSignInUserMutation, useCreateUserMutation } = userApi;
