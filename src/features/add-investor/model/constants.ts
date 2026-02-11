import { startOfDay } from "date-fns";

export const defaultValues = {
  name: "",
  id_number: "",
  contract_date: startOfDay(new Date()),
  interest_rate: "4",
  card_number: "",
  description: "",
};
