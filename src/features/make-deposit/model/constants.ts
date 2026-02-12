import { startOfDay } from "date-fns";

export const defaultValues = {
  amount: 10_000,
  interest_rate: 4,
  date: startOfDay(new Date()),
};
