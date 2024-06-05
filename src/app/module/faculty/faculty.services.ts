import mongoose from "mongoose";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { searchField } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

// get all faculty
const getAllFaculty = async (query: Record<string, unknown>) => {
  try {
    // console.log(query);
    const faculty = new QueryBuilder(Faculty.find(), query)
      .search(searchField)
      .filter()
      .patginate()
      .sort()
      .fields();
    const result = await faculty.modelQuery;
    const findfaculty = result?.length;
    return { findfaculty, result };
  } catch (err) {
    // console.log(err);
    return err;
  }
};

// get singgle faculty by _id
const getSingleFaculty = async (id: string) => {
  try {
    const result = await Faculty.findById(id).populate("user");
    return result;
  } catch (err) {
    return err;
  }
};

// update singgle faculty by _id
const updatedFaculty = async (id: string, payload: Partial<TFaculty>) => {
  try {
    const { name, ...remainingData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = remainingData;

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    }).populate("user");
    return result;
  } catch (err) {
    return err;
  }
};
// deleted singgle faculty by _id
const deletedFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // faculty update and session 1
    const faculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    ).populate("user");
    if (!faculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }
    // user update and session 2
    const userId = faculty?.user;
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();

    return faculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return err;
  }
};

export const FacultyServices = {
  getAllFaculty,
  getSingleFaculty,
  updatedFaculty,
  deletedFaculty,
};
