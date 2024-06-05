import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleMongooseCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSource: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    errorSource: errorSource,
    message: "Invalid ID",
    statusCode: 400,
  };
};

export default handleMongooseCastError;

// {
//     path: err?.path as string,
//     message: err?.message,
//   };
