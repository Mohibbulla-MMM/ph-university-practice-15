import { Schema, model } from "mongoose";
import {
  TGuardiant,
  TLocalguardiant,
  TPermanentAddress,
  TPresentAddress,
  TStudent,
  TUserName,
  TUserOrStudentIsExistsMethods,
  TUserOrStudentIsExistsModel,
} from "./student.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

// student user name schema
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
// student guardiant schema
const guardiantShema = new Schema<TGuardiant>({
  fatherName: { type: String, required: true },
  fathercontact: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  mothercontact: { type: String, required: true },
  motheroccupation: { type: String, required: true },
});
// local guardian schema
const localGuardiantSchema = new Schema<TLocalguardiant>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});
// permanent Address schema
const permanentAddressShema = new Schema<TPermanentAddress>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  postCode: { type: String, required: true },
  village: { type: String, required: true },
});
// presenst address schema
const presentAddressSchema = new Schema<TPresentAddress>({
  city: { type: String },
  country: { type: String },
  postCode: { type: String },
  village: { type: String },
});

// --- student main schema ----
export const studentSchema = new Schema<
  TStudent,
  TUserOrStudentIsExistsModel,
  TUserOrStudentIsExistsMethods
>(
  {
    name: { type: userNameSchema, required: true },
    id: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "User",
    },
    bloodGroup: {
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    emargencyContactNo: { type: String, required: true },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
      },
    },

    guardiant: {
      type: guardiantShema,
      required: true,
    },
    localGuardiant: {
      type: localGuardiantSchema,
      required: true,
    },
    permanentAddress: {
      type: permanentAddressShema,
      required: true,
    },
    presentAddress: {
      type: presentAddressSchema,
      required: true,
    },
    profileImage: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("findOneAndUpdate", async function (next) {
  const id = this.getQuery();
  // console.log(id);
  const student = await Student.findOne(id);
  // console.log(student);
  if (!student) {
    console.log("inside call");
    return next(new Error("Student dosen't exists"));
  }
  next();
});

// throw new AppError(httpStatus.NOT_FOUND, "Student dosen't exists");

export const Student = model<TStudent, TUserOrStudentIsExistsModel>(
  "Students",
  studentSchema
);
