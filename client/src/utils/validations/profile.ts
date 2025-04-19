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

export const validateImageFile = (file: File): string | null => {
  const fileSize = file.size / 1024 / 1024;
  if (fileSize >= 5) return "Image size must be less than 5 MB";

  const allowedFormats = ["image/jpeg", "image/png"];
  if (!allowedFormats.includes(file.type))
    return "Image must be in PNG or JPG format";

  return null;
};
