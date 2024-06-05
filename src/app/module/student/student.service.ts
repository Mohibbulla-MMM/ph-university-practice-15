import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.modules";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { searchField } from "./student.constant";

// find all student from db
const findAllStudent = async (query: Record<string, unknown>) => {
  // // fiter query
  // const filterObj = { ...query };
  // // search term
  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const searchField: string[] = [
  //   "name.lastName",
  //   "name.firstName",
  //   "email",
  //   "gender",
  //   "presentAddress.country",
  // ];
  // const searchQuery = {
  //   $or: searchField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // };

  // // fileds query
  // let fieldsQery: string = "-__v";
  // if (query?.fields) {
  //   const fields = `${query.fields}`;
  //   fieldsQery = fields.replace(/,/g, " ");
  //   console.log({ fieldsQery });
  // }

  // const studentSerch = Student.find(searchQuery).select(fieldsQery);
  // // console.log({ filterObj });
  // const excludeQuery = [
  //   "searchTerm",
  //   "sort",
  //   "limit",
  //   "page",
  //   "skip",
  //   "fields",
  // ];
  // excludeQuery.forEach((field) => {
  //   delete filterObj[field];
  // });
  // console.log({ query }, { filterObj });

  // const filterStudent = studentSerch.find(filterObj).populate([
  //   { path: "user" },
  //   { path: "admissionSemester" },
  //   {
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   },
  // ]);
  // // sort -----------
  // let sort = "-createAt";
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortStudent = filterStudent.sort(sort);

  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortStudent.skip(skip);

  // const limitStudent = await paginateQuery.limit(limit);
  // // console.log(limit);
  // const findStudent = limitStudent?.length;
  // return { findStudent, result: limitStudent };
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(searchField)
    .filter()
    .patginate()
    .sort()
    .fields();

  const result = await studentQuery.modelQuery.populate("user");
  // .populate([{ path: "user" }]);
  const findStudent = result?.length;
  return { findStudent, result };
};

// single student find by id
const findSingleStudent = async (id: string) => {
  const result = await Student.findById(id).populate("user");
  return result;
};

// single student deleted by id
const singleStudentDeleted = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const student = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!student) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted Student!");
    }

    const userId = student?.user;
    console.log({ userId });
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    console.log({ user });
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted User !");
    }
    await session.commitTransaction();
    await session.endSession();

    return student;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
// student update
const singleStudentUpdate = async (id: string, payload: Partial<TStudent>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const {
      name,
      guardiant,
      localGuardiant,
      permanentAddress,
      presentAddress,
      ...remaingData
    } = payload;

    const modifyUpdatedData: Record<string, unknown> = { ...remaingData };

    // name  set
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifyUpdatedData[`name.${key}`] = value;
      }
    }
    if (guardiant && Object.keys(guardiant).length) {
      for (const [key, value] of Object.entries(guardiant)) {
        modifyUpdatedData[`guardiant.${key}`] = value;
      }
    }
    if (localGuardiant && Object.keys(localGuardiant).length) {
      for (const [key, value] of Object.entries(localGuardiant)) {
        modifyUpdatedData[`localGuardiant.${key}`] = value;
      }
    }
    if (permanentAddress && Object.keys(permanentAddress).length) {
      for (const [key, value] of Object.entries(permanentAddress)) {
        modifyUpdatedData[`permanentAddress.${key}`] = value;
      }
    }
    if (presentAddress && Object.keys(presentAddress).length) {
      for (const [key, value] of Object.entries(presentAddress)) {
        modifyUpdatedData[`presentAddress.${key}`] = value;
      }
    }

    console.log(modifyUpdatedData);

    const result = await Student.findByIdAndUpdate(id, modifyUpdatedData, {
      new: true,
      runValidators: true,
      session,
    });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const StudentServices = {
  findAllStudent,
  findSingleStudent,
  singleStudentDeleted,
  singleStudentUpdate,
};
