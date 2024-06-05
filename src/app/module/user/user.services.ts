import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.module";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.modules";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Admin } from "../admin/admin.model";
import { Faculty } from "../faculty/faculty.model";

// create sutdent
const createStudent = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);
  userData.role = "student";

  // session start
  const session = await mongoose.startSession();
  try {
    // transaction start
    session.startTransaction();
    // session-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User create faild!");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // session-2
    const createStudent = await Student.create([payload], { session });
    if (!createStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student create faild!");
    }

    await session.commitTransaction();
    await session.endSession();

    return createStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }

  //   return newUser;
};

// create admin
const createAdmin = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.id = await generateAdminId();
  userData.role = "admin";

  // session start
  const session = await mongoose.startSession();
  try {
    // transaction start
    session.startTransaction();
    // session-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User create faild!");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // session-2
    const createAdmin = await Admin.create([payload], { session });
    if (!createAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student create faild!");
    }

    await session.commitTransaction();
    await session.endSession();

    return createAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }

  //   return newUser;
};

// create admin --------------
const createFacultry = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.id = await generateFacultyId();
  // userData.id = "F-0001";
  userData.role = "faculty";
  console.log("faculty ------------------------");
  // session start
  const session = await mongoose.startSession();
  try {
    // transaction start
    session.startTransaction();
    // session-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User create faild!");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // session-2
    const createAdmin = await Faculty.create([payload], { session });
    if (!createAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty create faild!");
    }

    await session.commitTransaction();
    await session.endSession();

    return createAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }

  //   return newUser;
};

// find all users
const findAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createStudent,
  createAdmin,
  createFacultry,
  findAllUsers,
};
