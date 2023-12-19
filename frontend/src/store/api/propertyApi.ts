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

export const filterPropertiesByName = (
  properties: Property[],
  name: string,
): Property[] => {
  return properties.filter(property =>
    property.name.toLowerCase().includes(name.toLowerCase()),
  );
};

export const useSearchProperty = (name: string) => {
  const { data: allProperties } = useGetAllPropertyQuery([100, 1], {
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

export const { useGetAllPropertyQuery } = propertyApi;
