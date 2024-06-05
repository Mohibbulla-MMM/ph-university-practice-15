import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSource: TErrorSources = Object.values(err.errors).map((value) => {
    return {
      path: value?.path,
      message: value?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation error",
    errorSource,
  };
};

export default handleMongooseValidationError;
