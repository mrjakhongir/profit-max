export interface Deposit {
  id: string;
  amount: number;
  interest_rate: number;
  date: string;
  user_id: string;
  investor_id: string;
  is_active: boolean;
  initial_dividend: number;
  monthly_dividend: number;
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
