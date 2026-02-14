import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = new Set(["image/png", "image/jpeg", "image/jpg"]);

export const spottingSchema = z.object({
  deposit_id: z.uuidv4(),
  amount: z.number().min(100, "Amount must be at least $100"),
  date: z.date(),
  image: z
    .instanceof(File)
    .refine((file) => ACCEPTED.has(file.type), "Only PNG or JPG")
    .refine((file) => file.size <= MAX_SIZE, "Max size is 5MB"),
});

export type SpottingFormValues = z.infer<typeof spottingSchema>;
