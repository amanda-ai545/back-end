import { AxiosError } from "axios";

export const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError !== undefined;
};
