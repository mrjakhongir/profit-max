export interface Deposit {
  id: string;
  amount: number;
  interest_rate: number;
  date: string;
  user_id: string;
  investor_id: string;
  is_active: boolean;
}
