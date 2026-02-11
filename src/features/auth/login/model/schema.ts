import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(3, "Email must be at least 3 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "Password must include at least one symbol examples !@#$%^&*()_+",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
