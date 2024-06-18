import { Types } from "mongoose";

export type TDays =
  | "Mon"
  | "Tues"
  | "Wednes"
  | "Thurs"
  | "Fri"
  | "Satur"
  | "Sun";

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};


export type TShedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};