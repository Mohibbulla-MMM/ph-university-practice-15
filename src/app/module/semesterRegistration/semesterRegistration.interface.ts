import { Model, Types } from "mongoose";
export type TStatus = "UPCOMMING" | "ONGOING" | "ENDED";

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: TStatus;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

export interface SemesterRegistrationModel extends Model<TSemesterRegistration> {
  isExisteSemesterRegistrationStaticMethod(id: Types.ObjectId): Promise<string>;
}
