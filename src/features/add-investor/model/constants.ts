import { startOfDay } from "date-fns";

export const defaultValues = {
  name: "",
  id_number: "",
  contract_date: startOfDay(new Date()),
  card_number: "",
  description: "",
};
