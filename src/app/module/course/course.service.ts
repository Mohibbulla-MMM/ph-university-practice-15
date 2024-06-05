import mongoose from "mongoose";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { searchableFields } from "./course.constatnt";
import { TCourse, TCourseFacuty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseFromDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(searchableFields)
    .filter()
    .patginate()
    .sort()
    .fields();
  const result = await courseQuery.modelQuery.populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseInToDB = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  // try {
  //   session.startTransaction();

  //   const basicCourseUpdate = await Course.findByIdAndUpdate(
  //     id,
  //     courseRemainingData,
  //     { new: true, session }
  //   );
  //   if (!basicCourseUpdate) {
  //     throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
  //   }

  //   if (preRequisiteCourses && preRequisiteCourses.length > 0) {
  //     // remove prerequisite course ------------------------
  //     const deletedPrequiesit = preRequisiteCourses
  //       ?.filter((element) => element.course && element.isDeleted)
  //       ?.map((el) => el.course);

  //     const remodePrereqisite = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $pull: {
  //           preRequisiteCourses: { course: { $in: deletedPrequiesit } },
  //         },
  //       },
  //       { new: true, runValidators: true, session }
  //     );

  //     if (!remodePrereqisite) {
  //       throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
  //     }

  //     // add prerequisite course ------------------------
  //     const addPrerequisiteCourse = preRequisiteCourses?.filter(
  //       (el) => el.course && !el.isDeleted
  //     );
  //     console.log(addPrerequisiteCourse);
  //     const addPrerequisite = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $addToSet: {
  //           preRequisiteCourses: { $each: addPrerequisiteCourse },
  //         },
  //       },
  //       {
  //         runValidators: true,
  //         new: true,
  //         session,
  //       }
  //     );
  //     if (!addPrerequisite) {
  //       throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
  //     }
  //   }

  //   await session.commitTransaction();
  //   await session.endSession();

  //   const result = await Course.findById(id);
  //   return result;
  // }
  try {
    session.startTransaction();
    //step1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );
      console.log(newPreRequisites);
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {$each: newPreRequisites},
          },
        },
        {
          id: false,
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const assignFacultyWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFacuty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true }
  );

  return result;
};

export const CourseServices = {
  createCourseFromDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseInToDB,
  deleteCourseFromDB,
  assignFacultyWithCourseIntoDB,
};
