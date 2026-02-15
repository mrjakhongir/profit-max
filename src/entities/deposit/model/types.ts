import type {
  Deposit,
  Transaction,
} from "@/pages/(investor)/details/model/types";

export interface TransactionResponse {
  deposit: Deposit;
  dividends: Transaction[];
  withdrawals: Transaction[];
}
