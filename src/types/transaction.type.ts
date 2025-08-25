export type TransactionType =
  | "CASH_IN"
  | "CASH_OUT"
  | "SEND_MONEY"
  | "WITHDRAW"
  | "FEE_ADJUST"
  | "COMMISSION_PAYOUT"; // adjust to your enum if different

export interface IPartyLite {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface ITransaction {
  _id: string;
  type: TransactionType;
  amount: number;
  fee?: number;
  commission?: number;
  sender?: IPartyLite | null;
  receiver?: IPartyLite | null;
  agent?: IPartyLite | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number; // backend might send totalPage — we'll normalize
}

export type ApiEnvelope<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IPaginatedMeta & { totalPage?: number };
};
