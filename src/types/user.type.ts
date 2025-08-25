export type IsActive = "ACTIVE" | "PENDING" | "BLOCKED" | "INACTIVE";
export type Role = "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

export interface IWallet {
  _id?: string;
  user?: string;
  balance?: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  isActive: IsActive;
  isVerified?: boolean;
  picture?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  wallet?: IWallet;
}

export interface IPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export type ApiEnvelope<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IPaginatedMeta;
};
