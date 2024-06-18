import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicFacultySchema.pre("save", async function (next) {
  const name = this?.name;
  const academicFacultyIsExiste = await AcademicFaculty.findOne({ name });
  if (academicFacultyIsExiste) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Academic Faculty already adsf !"
    );
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
