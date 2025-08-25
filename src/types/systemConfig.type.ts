export interface ISystemConfig {
  _id: string;                
  agentCashInRate: number;
  agentCashOutRate: number;
  userSendMoneyRate: number;
  userWithdrawRate: number;
  createdAt?: string;
  updatedAt?: string;
}
