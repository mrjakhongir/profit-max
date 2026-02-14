import { startOfDay } from "date-fns";

export const defaultValues = {
  deposit_id: "",
  amount: 1000,
  date: startOfDay(new Date()),
  image: undefined,
};
