import { Response } from "express";
import httpStatus from "http-status";

type TResponse<T> = {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: T;
};


const success = true;
const statusCode = httpStatus.OK;
const sendRespons = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode || statusCode).json({
    success: data?.success || success,
    message: data.message,
    data: data.data,
  });
};

export default sendRespons;
