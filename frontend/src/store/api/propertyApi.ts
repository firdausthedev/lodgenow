import { baseApi } from "./baseApi";
import { Property } from "./../types";

export interface getAllPropertyResponse {
  success: boolean;
  data: Property[];
  count: number;
  pagination: {
    prev?: {
      page: number;
      limit: number;
    };
    next?: {
      page: number;
      limit: number;
    };
  };
}

const propertyApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllProperty: build.query<getAllPropertyResponse, [number, number]>({
      query: (args: [number, number]) => {
        const [limit, page] = args;
        return {
          url: `property?limit=${limit}&page=${page}`,
          method: "GET",
        };
      },
      transformResponse: (response: getAllPropertyResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllPropertyQuery } = propertyApi;
