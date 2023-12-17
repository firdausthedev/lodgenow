import { baseApi } from "./baseApi";
import { Agent } from "./../types";

export interface getAgentResponse {
  success: boolean;
  data: Agent;
}

const agentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAgent: build.query({
      query: id => ({ url: `agent/${id}`, method: "GET" }),
      transformResponse: (response: getAgentResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAgentQuery } = agentApi;
