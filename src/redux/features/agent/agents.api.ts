import { baseApi } from "@/redux/baseApi";
import type { ApiEnvelope, IPaginatedMeta, IUser, IsActive } from "@/types/user.type";

export type GetAgentsQuery = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: IsActive | "ALL";
  sortBy?: "createdAt" | "name" | "email" | "isActive";
  sortOrder?: "asc" | "desc";
};

export type AgentsListResponse = {
  data: IUser[];
  meta: IPaginatedMeta;
};

export const agentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query<AgentsListResponse, GetAgentsQuery | void>({
      query: (q) => {
        const params = new URLSearchParams();
        if (q?.page) params.set("page", String(q.page));
        if (q?.limit) params.set("limit", String(q.limit));
        if (q?.searchTerm) params.set("searchTerm", q.searchTerm);
        if (q?.isActive && q.isActive !== "ALL") params.set("isActive", q.isActive);
        return {
          url: `/user/all-agent?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (res: ApiEnvelope<IUser[]>) => ({
        data: res.data,
        meta: res.meta || { page: 1, limit: res.data?.length ?? 0, total: res.data?.length ?? 0 },
      })
    }),

    approveRejectAgent: builder.mutation<IUser, { id: string; isActive: IsActive }>({
      query: ({ id, isActive }) => ({
        url: `/user/agent/approve-reject/${id}`,
        method: "PATCH",
        data: { isActive },
      }),
      transformResponse: (res: ApiEnvelope<IUser>) => res.data,
    }),
  }),
});

export const { useGetAgentsQuery, useApproveRejectAgentMutation } = agentsApi;
