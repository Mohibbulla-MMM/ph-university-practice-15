import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TGuardiant = {
  fatherName: string;
  fatheroccupation: string;
  fathercontact: string;
  motherName: string;
  motheroccupation: string;
  mothercontact: string;
};
export type TPresentAddress = {
  country: string;
  city: string;
  village: string;
  postCode: string;
};
export type TPermanentAddress = {
  country: string;
  city: string;
  village: string;
  postCode: string;
};

export type TLocalguardiant = {
  name: string;
  contact: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  dateOfBirth: string;
  contact: string;
  emargencyContactNo: string;
  gender: "male" | "female" | "others";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: TPresentAddress;
  permanentAddress: TPermanentAddress;
  guardiant: TGuardiant;
  localGuardiant: TLocalguardiant;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImage?: string;
  isDeleted: boolean;
};

export type TUserOrStudentIsExistsMethods = {
  isUserOrStudentExists(id: string): Promise<string | null | {} >;
};

export type TUserOrStudentIsExistsModel = Model<
  TStudent,
  Record<string, never>,
  TUserOrStudentIsExistsMethods
>;
// isDeleted: boolean;
