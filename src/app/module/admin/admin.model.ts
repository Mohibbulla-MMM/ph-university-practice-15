import { Schema, model } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";
import { BloodGroup, Gender } from "./admin.constant";

const adminNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
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
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Admin = model<TAdmin>("Admin", adminSchema);
