import { z } from "zod";

export const investorSchema = z.object({
  name: z.string().min(3, "Fullname must be at least 3 characters"),
  contract_date: z.date(),
  interest_rate: z.number().min(1, "Interest rate must be at least 1%"),
  amount: z.number().min(100, "Amount must be at least $100"),
  card_number: z
    .string()
    .min(1, "Card number is required")
    .transform((value) => value.replaceAll(/\s/g, "")) // Remove all spaces
    .refine((value) => /^[0-9]{16}$/.test(value), {
      message: "Card number must be 16 digits",
    }),
  description: z.string().optional(),
  id_number: z
    .string()
    .min(1, "ID number is required")
    .regex(/^[A-Z]{2}\s\d{7}$/, "Invalid ID format (AA 1234567)"),
});

export type AddInvestorValues = z.infer<typeof investorSchema>;
