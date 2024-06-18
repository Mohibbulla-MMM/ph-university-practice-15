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
import { USER_ROLE } from "./user.constant";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

// create sutdent
const createStudent = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config?.default_password;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admision semester not found");
  }
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);
  userData.role = USER_ROLE?.student;
  userData.email = payload?.email;
  console.log(userData.id);

  // session start
  const session = await mongoose.startSession();
  try {
    sendImageToCloudinary()
    // transaction start
    session.startTransaction();
    // session-1
    const newUser = await User.create([userData], { session });
    console.log({ newUser });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User create faild!");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // session-2
    const createStudent = await Student.create([payload], { session });
    console.log({ createStudent });
    if (!createStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student create faild!");
    }

    await session.commitTransaction();
    await session.endSession();

    return createStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }

  //   return newUser;
};

// create admin
const createAdmin = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.id = await generateAdminId();
  userData.role = USER_ROLE?.admin;
  userData.email = payload?.email;

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
  userData.role = USER_ROLE?.faculty;
  userData.email = payload?.email;
  // console.log("faculty ------------------------");
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

// find all users
const findMe = async (id: string, role: string) => {
  try {
    let result = null;
    // user find
    // console.log("--------------------------");
    // console.log(role === USER_ROLE.student);
    if (role === USER_ROLE.student) {
      result = await Student.findOne({ id });
    }
    // faculty find
    if (role === USER_ROLE.faculty) {
      result = await Faculty.findOne({ id });
    }
    // admin find
    if (role === USER_ROLE.admin) {
      result = await Admin.findOne({ id });
    }
    // console.log({ result });
    return result;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

//change User Status
const changeUserStatus = async (id: string, payload: { status: string }) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // console.log(id, { payload });
    const user = await User.findById(id).session(session);

    const result = await User.findOneAndUpdate(
      { _id: id },
      {
        status: payload.status,
      },
      {
        new: true,
        session,
      }
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const UserServices = {
  createStudent,
  createAdmin,
  createFacultry,
  findAllUsers,
  findMe,
  changeUserStatus,
};
