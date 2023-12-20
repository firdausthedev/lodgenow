import { baseApi } from "./baseApi";

export interface postUserSignInResponse {
  success: boolean;
  message: string;
  token: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postUserSignIn: build.mutation({
      query: ({ username, password }) => ({
        url: `user/signin`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      transformResponse: (response: postUserSignInResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { usePostUserSignInMutation } = userApi;
