import { Schema, Types, model } from "mongoose";
import {
  SemesterRegistrationModel,
  TSemesterRegistration,
} from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const semsesterRegistrationSchema = new Schema<
  TSemesterRegistration,
  SemesterRegistrationModel
>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCOMMING",
    },
    startDate: { type: Date, trim: true, required: true },
    endDate: { type: Date, trim: true, required: true },
    minCredit: { type: Number, trim: true, default: 3 },
    maxCredit: { type: Number, trim: true, default: 15 },
  },
  {
    timestamps: true,
  }
);

// const schema = new Schema<IUser, UserModel>({ name: String });

// schema.static('myStaticMethod', function myStaticMethod() {
//   return 42;
// });

semsesterRegistrationSchema.static(
  "isExisteSemesterRegistrationStaticMethod",
  async function isExisteSemesterRegistrationStaticMethod(
    academicSemester: Types.ObjectId
  ) {
    try {
      const isSemesterRegistrationExiste = await SemesterRegistration.findOne({
        academicSemester,
      });
      if (isSemesterRegistrationExiste) {
        throw new AppError(
          httpStatus.CONFLICT,
          "This Semester is already Registred !"
        );
      }
    } catch (err) {
      throw new AppError(httpStatus.CONFLICT, `${err}`);
    }
  }
);

// const User = model<IUser, UserModel>('User', schema);

// const answer: number = User.myStaticMethod(); // 42

const SemesterRegistration = model<
  TSemesterRegistration,
  SemesterRegistrationModel
>("SemesterRegistration", semsesterRegistrationSchema);

export { SemesterRegistration };
