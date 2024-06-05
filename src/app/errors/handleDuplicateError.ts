import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /"([^"]*)"/;
  const match = err?.errorResponse?.errmsg?.match(regex);
  const extractMessage = match && match[1];
  const path = Object.keys(err?.keyPattern)[0];
  const message = Object.values(err?.keyValue)[0] as string;

  return {
    statusCode: 400,
    message: `<<<${extractMessage}>>> is already exist `,
    errorSource: [
      {
        path: path,
        message: message,
      },
    ],
  };
};

export default handleDuplicateError;

// statusCode: number;
// message: string;
// errorSource: TErrorSources;
