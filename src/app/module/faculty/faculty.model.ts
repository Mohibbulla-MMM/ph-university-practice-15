import { Schema, model } from "mongoose";
import { TFaculty, TUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const adminNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    designation: { type: String, required: true },
    name: adminNameSchema,
    gender: {
      type: String,
      enum: Gender,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emargencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
    },
    presentAddress: String,
    permanentAddress: String,
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<TFaculty>("Faculty", facultySchema);
