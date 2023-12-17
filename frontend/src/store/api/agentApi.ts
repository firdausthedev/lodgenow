import { baseApi } from "./baseApi";
import { Agent } from "./../types";

interface AgentResponse {
  success: boolean;
  data: Agent;
}

const agentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAgent: build.query({
      query: id => ({ url: `agent/${id}`, method: "GET" }),
      transformResponse: (response: AgentResponse) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAgentQuery } = agentApi;
