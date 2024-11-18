import { z } from "zod";

const validations: Record<string, RegExp> = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
  frontendmentor:
    /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_-]+$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
  youtube: /^https:\/\/(www\.)?youtube\.com\/@[\w-]+$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_-]+$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+$/,
  codewars: /^https:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+$/,
  freecodecamp: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+$/,
  gitlab: /^https:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+$/,
  hashnode: /^https:\/\/(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+$/,
  stackoverflow:
    /^https:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+$/,
};

export const linkValidation = z.object({
  links: z.array(
    z
      .object({
        platform: z.object({
          value: z.string(),
          label: z.string(),
        }),
        url: z.string().min(1, "Can't be empty"),
      })
      .superRefine((val, ctx) => {
        const platform = val.platform.value as keyof typeof validations;

        if (!validations[platform].test(val.url)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please check the URL",
            path: ["url"],
          });
        }
      })
  ),
});
