import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendRespons from "../../utils/sendRespons";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const findAllStudent = catchAsync(async (req, res) => {
  // const { searchTerm } = req.query;
  const result = await StudentServices.findAllStudent(req.query);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Find student all student success",
    data: result,
  });
});

const findSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.findSingleStudent(id);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Find single Student success",
    data: result,
  });
});

const singleStudentDeleted = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.singleStudentDeleted(id);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted success",
    data: result,
  });
});

const singleStudentUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.singleStudentUpdate(id, student);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated success",
    data: result,
  });
});

export const StudentControllers = {
  findAllStudent,
  findSingleStudent,
  singleStudentDeleted,
  singleStudentUpdate,
};
