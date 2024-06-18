import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { OfferedCourseServices } from "./offeredCourse.services";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseInToDB(
    req.body
  );
  sendRespons(res, {
    message: "Create Offered Course Success !",
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(
    req.query
  );
  sendRespons(res, {
    message: "Offered Courses retrived Successfully !",
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  sendRespons(res, {
    message: "Offered Course retrive Successfully !",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseInToDB(
    id,
    req.body
  );
  sendRespons(res, {
    message: "Updated Offered Course Successfully !",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
