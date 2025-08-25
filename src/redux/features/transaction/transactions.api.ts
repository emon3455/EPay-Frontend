import { baseApi } from "@/redux/baseApi";
import type { ApiEnvelope, ITransaction, IPaginatedMeta } from "@/types/transaction.type";

export type TxQuery = {
  page?: number;
  limit?: number;
  search?: string;       // party search (name/email/phone)
  startDate?: string;    // YYYY-MM-DD
  endDate?: string;      // YYYY-MM-DD
  type?: string;         // TransactionType
  amountMin?: number;
  amountMax?: number;
  sender?: string;       // userId
  receiver?: string;     // userId
  agent?: string;        // userId
  sortBy?: "createdAt" | "amount" | "type";
  sortOrder?: "asc" | "desc";
};

export type TxListResponse = { data: ITransaction[]; meta: IPaginatedMeta };

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TxListResponse, TxQuery | void>({
      query: (q) => {
        const params = new URLSearchParams();
        if (q?.page) params.set("page", String(q.page));
        if (q?.limit) params.set("limit", String(q.limit));
        if (q?.search) {
          // backend supports either `search` or `searchTerm`
          params.set("search", q.search);
          params.set("searchTerm", q.search);
        }
        if (q?.startDate) params.set("startDate", q.startDate);
        if (q?.endDate) params.set("endDate", q.endDate);
        if (q?.type) params.set("type", q.type);
        if (q?.amountMin != null) params.set("amountMin", String(q.amountMin));
        if (q?.amountMax != null) params.set("amountMax", String(q.amountMax));
        if (q?.sender) params.set("sender", q.sender);
        if (q?.receiver) params.set("receiver", q.receiver);
        if (q?.agent) params.set("agent", q.agent);
        // if (q?.sortBy) params.set("sortBy", q.sortBy);
        // if (q?.sortOrder) params.set("sortOrder", q.sortOrder ?? "desc");

        return { url: `/transaction/admin/all?${params.toString()}`, method: "GET" };
      },
      transformResponse: (res: ApiEnvelope<ITransaction[]>) => ({
        data: res.data,
        meta: res.meta || { page: 1, limit: res.data?.length ?? 0, total: res.data?.length ?? 0 },
      }),
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionsApi;
