import { isAxiosError } from "axios";

const handleAxiosError = <T>(error: unknown): T =>
  isAxiosError(error)
    ? (error.response?.data as T)
    : ({ message: "An error occurred. Please try again." } as T);

export default handleAxiosError;
