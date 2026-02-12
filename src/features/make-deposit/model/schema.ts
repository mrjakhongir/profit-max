import { z } from "zod";

export const depositSchema = z.object({
  amount: z.number().min(100, "Amount must be at least $100"),
  interest_rate: z.number().min(1, "Interest rate must be at least 1%"),
  date: z.date(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
