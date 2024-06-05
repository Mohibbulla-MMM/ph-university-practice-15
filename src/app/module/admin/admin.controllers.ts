import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { AdminServices } from "./admin.services";

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmin(req.query);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find all admin success!",
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdmin(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find a admin success!",
  });
});

const updatedAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.updatedAdmin(id, req.body);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Update a admin success!",
  });
});

const deletedAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deletedAdmin(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find a admin success!",
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updatedAdmin,
  deletedAdmin,
};
