import { baseApi } from "./baseApi";

interface getAllReviewsResponse {
  success: boolean;
  data: getAllReviewsData[];
}

export interface getAllReviewsData {
  id: string;
  rating: number;
  comment: string;
  propertyId: string;
  userId: string;
  createdAt: string;
  user: {
    username: string;
  };
  property: {
    name: string;
  };
}

const reviewApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllReviews: build.query({
      query: () => ({ url: "review/", method: "GET" }),
      transformResponse: (response: getAllReviewsResponse) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllReviewsQuery } = reviewApi;
