export interface Deposit {
  id: string;
  amount: number;
  interest_rate: number;
  date: string;
  user_id: string;
  investor_id: string;
  is_active: boolean;
}

export interface Transaction {
  id: string;
  user_id: string;
  investor_id: string;
  deposit_id: string;
  amount: number;
  date: string;
  image: string;
  type: string;
}

export interface Balance {
  total_dividends: number;
  total_withdrawn: number;
  total_balance: number;
  total_deposited: number;
}
