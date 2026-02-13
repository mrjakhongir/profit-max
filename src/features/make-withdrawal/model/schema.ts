import { z } from "zod";

export const withdrawalSchema = z.object({
  deposit_id: z.uuidv4(),
  amount: z.number().min(100, "Amount must be at least $100"),
  date: z.date(),
});

export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;
