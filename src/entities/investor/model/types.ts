export interface Investor {
  id: string;
  created_at: string;
  name: string;
  id_number: string;
  contract_date: string;
  card_number: string;
  interest_rate: string;
  description: string;
  is_active: boolean;
  user_id: string;
  amount: number;
}

export interface InvestorBalance {
  total_dividends: number;
  total_withdrawn: number;
  total_balance: number;
  total_deposited: number;
}
