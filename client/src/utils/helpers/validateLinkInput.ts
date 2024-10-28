import { Platform } from "../../types/link";

import getLinkValidation from "../validations/linkValidation";

interface ValidationResult {
  isError: boolean;
  message: string;
}

const validateLinkInput = (
  value: string,
  platform: Platform
): ValidationResult => {
  const pattern = new RegExp(getLinkValidation(platform));
  const isEmpty = value.trim() === "";
  const isError = !pattern.test(value) && !isEmpty;

  const message = isEmpty
    ? "Can't be empty"
    : isError
    ? "Invalid URL format"
    : "";

  return { isError: isEmpty || isError, message };
};

export default validateLinkInput;
