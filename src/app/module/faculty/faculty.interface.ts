import { Types } from "mongoose";

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type TGender = "male" | "female" | "others";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emargencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  adademicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage?: string;
  isDeleted: boolean;
};
