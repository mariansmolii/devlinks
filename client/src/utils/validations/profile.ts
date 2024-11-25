import { z } from "zod";
import { emailRegexp } from "./auth";

const nameRegexp = /^[a-zA-Z]+$/s;

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "Can't be empty")
    .regex(nameRegexp, "Invalid name"),
  lastName: z
    .string()
    .min(1, "Can't be empty")
    .regex(nameRegexp, "Invalid name"),
  profileEmail: z
    .string()
    .optional()
    .refine(
      (email) => !email || emailRegexp.test(email),
      "Invalid email address"
    ),
});
