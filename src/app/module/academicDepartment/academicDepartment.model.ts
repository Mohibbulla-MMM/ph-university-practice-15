import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    require: true,
  },
});

academicDepartmentSchema.pre("save", async function (next) {
  const isExists = await AcademicDepartment.findOne({ name: this.name });
  if (isExists) {
    throw new AppError(400, "This academic department already exists !");
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const id = this.getQuery();

  const isDepartmentExist = await this.model.findOne(id);

  if (!isDepartmentExist) {
    throw new AppError(404, "This department dose not exists !");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
