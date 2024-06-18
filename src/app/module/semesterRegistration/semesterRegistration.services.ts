import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.module";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { ConstSemseterStatus } from "./semesterRegistration.constant";

//  create Semester Registration
const createSemesterRegistrationInToDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  // check is semester UPCOMMING Or ONGOIN
  const isExisteUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: ConstSemseterStatus.UPCOMMING },
      { status: ConstSemseterStatus.ONGOING },
    ],
  });

  if (isExisteUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an "${isExisteUpcomingOrOngoingSemester.status}" registered semester !`
    );
  }
  // check academic semester is Exist
  const isAcademicSemesterExiste = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExiste) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Academic semester not found  !"
    );
  }

  // console.log("11111111111111111110");

  await SemesterRegistration.isExisteSemesterRegistrationStaticMethod(
    academicSemester
  );

  // console.log("2222222222222222");

  // // check semester registration is Exist
  // const isSemesterRegistrationExiste = await SemesterRegistration.findOne({
  //   academicSemester,
  // });
  // if (isSemesterRegistrationExiste) {
  //   throw new AppError(
  //     httpStatus.CONFLICT,
  //     "This Semester is already Registred !"
  //   );
  // }

  const result = await SemesterRegistration.create(payload);
  return result;
};

//  get all Semester Registration
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find(),
    query
  )
    .filter()
    .fields()
    .patginate()
    .sort();

  const result = await semesterRegistrationQuery.modelQuery.populate(
    "academicSemester"
  );
  return result;
};

//  get single Semester Registration
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

//  get single Semester Registration
const updateSemesterRegistrationInToDB = async (
  id: string,
  payload: TSemesterRegistration
) => {
  // check semester registration is Exist
  const isSemesterRegistrationExiste = await SemesterRegistration.findById(id);
  const currentSemesterStatus = isSemesterRegistrationExiste?.status;
  const requestSemesterStatus = payload?.status;

  if (!isSemesterRegistrationExiste) {
    throw new AppError(httpStatus.NOT_FOUND, "This Semester is not found !");
  }

  // I will not update if the status is ENDED
  if (currentSemesterStatus === ConstSemseterStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester is already ${currentSemesterStatus}`
    );
  }

  // if semester status UPCOMMING and request status ENDED then not updated

  if (
    currentSemesterStatus === ConstSemseterStatus.UPCOMMING &&
    requestSemesterStatus === ConstSemseterStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cann't direcly change ${currentSemesterStatus} to ${requestSemesterStatus}`
    );
  }

  // if semester status ONGOING and request status UPCOMMING then not updated
  if (
    currentSemesterStatus === ConstSemseterStatus.ONGOING &&
    requestSemesterStatus === ConstSemseterStatus.UPCOMMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cann't direcly change ${currentSemesterStatus} to ${requestSemesterStatus}`
    );
  }

 
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationInToDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInToDB,
};
