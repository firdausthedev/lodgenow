import { baseApi } from "./baseApi";

export interface postUserSignInResponse {
  success: boolean;
  token: string;
  userId: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postUserSignIn: build.query({
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

export const { usePostUserSignInQuery } = userApi;
