import { getDate, getDaysInMonth } from "date-fns";

export function calculateDividends(
  amount: number,
  interestRate: number,
  depositDate: Date,
) {
  const daysInMonth = getDaysInMonth(depositDate);
  const dayOfMonth = getDate(depositDate);

  const monthlyDividend = amount * (interestRate / 100);

  const dailyDividend = monthlyDividend / daysInMonth;
  const remainingDays = daysInMonth - dayOfMonth + 1;

  const initialDividend = dailyDividend * remainingDays;

  return {
    monthly_dividend: Number(monthlyDividend.toFixed(2)),
    initial_dividend: Number(initialDividend.toFixed(2)),
  };
}
