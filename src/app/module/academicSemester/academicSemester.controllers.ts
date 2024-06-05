import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { AcademicSemesterServices } from "./academicSemester.services";

// create academic semester
const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AcademicSemesterServices.createAcademicSemester(data);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester create success !",
    data: result,
  });
});

// get all academic semester
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemester();

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all academic semester success !",
    data: result,
  });
});

// get all academic semester
const findByIdAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.academicSemesterId;
  const result = await AcademicSemesterServices.findByIdAcademicSemester(id);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Find a academic semester success !",
    data: result,
  });
});

// get all academic semester
const findByIdAndUpdateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.academicSemesterId;
  const result =
    await AcademicSemesterServices.findByIdAndUpdateAcademicSemester(
      id,
      req.body
    );

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a academic semester success !",
    data: result,
  });
});

// export academic semester controllers
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  findByIdAcademicSemester,
  findByIdAndUpdateAcademicSemester
};
