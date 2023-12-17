import { baseApi } from "./baseApi";
import { Property } from "./../types";

export interface getAllPropertyResponse {
  success: boolean;
  data: Property[];
}

const propertyApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllProperty: build.query({
      query: limit => ({ url: `property?limit=${limit}`, method: "GET" }),
      transformResponse: (response: getAllPropertyResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllPropertyQuery } = propertyApi;
