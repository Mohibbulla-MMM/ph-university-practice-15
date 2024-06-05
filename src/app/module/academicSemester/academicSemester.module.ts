import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  }
);

AcademicSemesterSchema.pre("save", async function (next) {
  const isExistsAcademicSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExistsAcademicSemester) {
    throw new Error("This academic semester is already exists !!!");
  }

  next();
});

export const AcademicSemester = model(
  "AcademicSemester",
  AcademicSemesterSchema
);
