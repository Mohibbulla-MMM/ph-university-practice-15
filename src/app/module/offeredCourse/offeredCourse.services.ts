import httpStatus from "http-status";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { searchFields } from "./offeredCourse.constant";
import { TOfferedCourse } from "./offeredCourse.interface";
import OfferedCourse from "./offeredCourse.model";
import { Types } from "mongoose";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.mode";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { facultyTimeConflict } from "./offeredCourse.utils";

//  create Semester Registration
const createOfferedCourseInToDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    section,
    days,
    startTime,
    endTime,
    faculty,
  } = payload;

  // Types.ObjectId.isValid(semesterRegistration);
  // semesterRegistration id chaking
  const isSemesterRegistrationExiste = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExiste) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration not found!"
    );
  }
  const academicSemester = isSemesterRegistrationExiste.academicSemester;

  // Academic Department id chaking
  const isAcademicDepartmentExiste = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExiste) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found!");
  }

  // Academic Department id chaking
  const isAcademicFacultyExiste = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExiste) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found!");
  }

  // course id chaking
  const iscourseExiste = await Course.findById(course);
  if (!iscourseExiste) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found!");
  }

  // faculty id chaking
  const isFacultyExiste = await Faculty.findById(faculty);
  if (!isFacultyExiste) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found!");
  }

  // check if the depertment is belong to the faculty
  const isDepertmeBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment, // not use
    academicFaculty,
  });
  // academicDepartment,
  if (!isDepertmeBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This "${isAcademicDepartmentExiste.name}" is not belong to This "${isAcademicFacultyExiste.name}" faculty`
    );
  }

  // cheking same offered course with same section
  const isOfferedCourseWithSameSectionExist = await OfferedCourse.findOne({
    course,
    section,
    semesterRegistration,
  });
  if (isOfferedCourseWithSameSectionExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Offered course with same section already exist !`
    );
  }

  // get the shedule of the faculty
  const assignShedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  // console.log(assignShedule);
  const newShedule = {
    startTime,
    endTime,
    days,
  };

  if (facultyTimeConflict(newShedule, assignShedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Faculty is not avilable at that time. Choose others time or day !"
    );
  }
  // return true;
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

//  get all Semester Registration
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    OfferedCourse.find(),
    query
  )
    .search(searchFields)
    .filter()
    .fields()
    .patginate()
    .sort();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

//  get single Semester Registration
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

//  get single Semester Registration
const updateOfferedCourseInToDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "startTime" | "endTime" | "days">
) => {
  const { faculty, startTime, endTime, days } = payload;

  // chaking offered course existe
  const isOfferedCourseExiste = await OfferedCourse.findById(id);
  if (!isOfferedCourseExiste) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered Course not found`);
  }

  // faculty chaking
  const isFacultyExiste = await Faculty.findById(faculty);
  if (!isFacultyExiste) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty is not found`);
  }

  const semesterRegistration = isOfferedCourseExiste?.semesterRegistration;

  // chaking offered course status
  const chakingSemesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );
  const status = chakingSemesterRegistrationStatus?.status;
  if (status !== "UPCOMMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cann't update this offered course, it is ${status}`
    );
  }
  // get the shedule of the faculty
  const assignShedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  // console.log(assignShedule);
  const newShedule = {
    startTime,
    endTime,
    days,
  };

  if (facultyTimeConflict(newShedule, assignShedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Faculty is not avilable at that time. Choose others time or day !"
    );
  }

  return null;
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return "result";
};

export const OfferedCourseServices = {
  createOfferedCourseInToDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseInToDB,
};
