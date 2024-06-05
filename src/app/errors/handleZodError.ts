import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// handle zod error
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSources = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path.pop() as string | number,
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation error",
    errorSource,
  };
};
