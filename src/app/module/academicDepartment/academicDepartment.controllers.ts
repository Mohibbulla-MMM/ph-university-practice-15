import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { AcademicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  //   console.log({ data }, "---------------------------");
  const result = await AcademicDepartmentServices.createAcademicDepartment(
    data
  );

  sendRespons(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department create success !",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartment();

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department find all success !",
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicDepartment(
    DepartmentId
  );

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department find one success !",
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const data = req.body;
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    DepartmentId,
    data
  );

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department update one success !",
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
