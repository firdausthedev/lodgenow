import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../components/config";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${config.backendurl}/api/` }),
  endpoints: () => ({}),
});
