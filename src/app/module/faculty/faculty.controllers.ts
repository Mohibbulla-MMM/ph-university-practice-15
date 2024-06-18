import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.services";
import sendRespons from "../../utils/sendRespons";

const getAllFaculty = catchAsync(async (req, res) => {
  console.log("cookie", req.cookies);

  const result = await FacultyServices.getAllFaculty(req.query);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find all Faculty success!",
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFaculty(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find a Faculty success!",
  });
});

const updatedFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.updatedFaculty(id, req.body);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Update a Faculty success!",
  });
});

const deletedFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deletedFaculty(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find a Faculty success!",
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updatedFaculty,
  deletedFaculty,
};
