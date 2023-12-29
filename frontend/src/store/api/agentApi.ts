import { baseApi } from "./baseApi";
import { Agent } from "./../types";

export interface getAgentResponse {
  success: boolean;
  data: Agent;
}

export interface getAllAgentResponse {
  success: boolean;
  data: Agent[];
}

const agentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAgent: build.query({
      query: id => ({ url: `agent/${id}`, method: "GET" }),
      transformResponse: (response: getAgentResponse) => response,
    }),
    getAllAgent: build.query({
      query: () => ({ url: `agent/`, method: "GET" }),
      transformResponse: (response: getAllAgentResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAgentQuery, useGetAllAgentQuery } = agentApi;
