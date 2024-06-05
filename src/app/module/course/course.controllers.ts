import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";
import sendRespons from "../../utils/sendRespons";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseFromDB(req.body);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Course created successfull!",
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Find all Course success!",
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Course is retrive success!",
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInToDB(id, req.body);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Course has been successfully updated ! ",
  });
});

const deletedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Course is Deleted successfully ! ",
  });
});

const assignFacultyWithCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultyWithCourseIntoDB(id, faculties);
  sendRespons(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Course-Faculty is Updated successfully ! ",
  });
});
export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deletedCourse,
  assignFacultyWithCourse,
};
