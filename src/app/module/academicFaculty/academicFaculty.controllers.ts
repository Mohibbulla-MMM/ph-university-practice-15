import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { AcademicFacultyService } from "./academicFaculty.services";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  //   console.log({ data }, "---------------------------");
  const result = await AcademicFacultyService.createAcademicFaculty(data);

  sendRespons(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic faculty create success !",
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFaculty();

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty find all success !",
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.getSingleAcademicFaculty(
    facultyId
  );

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty find one success !",
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const data = req.body;
  const result = await AcademicFacultyService.updateAcademicFaculty(
    facultyId,
    data
  );

  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty update one success !",
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
