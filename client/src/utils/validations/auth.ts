import { z } from "zod";

export const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Can't be empty")
    .regex(emailRegexp, "Invalid email address"),
  password: z.string().min(1, "Can't be empty").min(8, "At least 8 characters"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Can't be empty")
      .regex(emailRegexp, "Invalid email address"),
    password: z
      .string()
      .min(1, "Can't be empty")
      .min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Can't be empty"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });
