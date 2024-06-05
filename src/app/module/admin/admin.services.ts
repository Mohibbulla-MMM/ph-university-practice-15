import mongoose from "mongoose";
import { User } from "../user/user.model";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { searchField } from "./admin.constant";

// get all admin
const getAllAdmin = async (query: Record<string, unknown>) => {
  try {
    console.log(query);
    const admin = new QueryBuilder(Admin.find(), query)
      .search(searchField)
      .filter()
      .patginate()
      .sort()
      .fields();
    const result = await admin.modelQuery;
    const findAdmin = result?.length;
    return { findAdmin, result };
  } catch (err) {
    // console.log(err);
    return err;
  }
};

// get singgle admin by _id
const getSingleAdmin = async (id: string) => {
  try {
    const result = await Admin.findById(id).populate("user");
    return result;
  } catch (err) {
    return err;
  }
};

// update singgle admin by _id
const updatedAdmin = async (id: string, payload: Partial<TAdmin>) => {
  try {
    const { name, ...remainingData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = remainingData;

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    }).populate("user");
    return result;
  } catch (err) {
    return err;
  }
};
// deleted singgle admin by _id
const deletedAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // admin update and session 1
    const admin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    ).populate("user");
    if (!admin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }
    // user update and session 2
    const userId = admin?.user;
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

    return admin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return err;
  }
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updatedAdmin,
  deletedAdmin,
};
