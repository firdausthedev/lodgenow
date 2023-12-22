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

export interface getOnePropertyResponse {
  success: boolean;
  data: Property;
}

const propertyApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllProperty: build.query<
      getAllPropertyResponse,
      [number, number, string]
    >({
      query: (args: [number, number, string]) => {
        const [limit, page, type] = args;
        return {
          url: `property?limit=${limit}&page=${page}${type && `&type=${type}`}`,
          method: "GET",
        };
      },
      transformResponse: (response: getAllPropertyResponse) => response,
    }),
    getOneProperty: build.query({
      query: id => {
        return {
          url: `property/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: getOnePropertyResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const filterPropertiesByName = (
  properties: Property[],
  name: string,
): Property[] => {
  return properties.filter(property =>
    property.name.toLowerCase().includes(name.toLowerCase()),
  );
};

export const useSearchProperty = (name: string) => {
  const { data: allProperties } = useGetAllPropertyQuery([100, 1, ""], {
    skip: name === "",
  });

  const searchResults = allProperties
    ? filterPropertiesByName(allProperties.data, name)
    : [];

  return {
    result: searchResults,
    isSuccess: true,
  };
};

export const { useGetAllPropertyQuery, useGetOnePropertyQuery } = propertyApi;
