import { baseApi } from "@/redux/baseApi";
import type { ISystemConfig } from "@/types/systemConfig.type";

// matches your response:
// { statusCode, success, message, data: T }
type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export const systemConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemConfig: builder.query<ISystemConfig, void>({
      query: () => ({ url: "/system-config", method: "GET" }),
      transformResponse: (res: ApiResponse<ISystemConfig>) => res.data,
      providesTags: ["SYSTEM_CONFIG"],
    }),

    updateSystemConfig: builder.mutation<ISystemConfig, Partial<ISystemConfig>>({
      query: (payload) => ({ url: "/system-config", method: "PUT", data: payload }),
      transformResponse: (res: ApiResponse<ISystemConfig>) => res.data,
      invalidatesTags: ["SYSTEM_CONFIG"],
    }),
  }),
});

export const {
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
} = systemConfigApi;
