import { AcademicSemesterCodeAndYearMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.module";

// create semester
const createAcademicSemester = async (paylod: TAcademicSemester) => {
  if (AcademicSemesterCodeAndYearMapper[paylod.name] !== paylod.code) {
    throw new Error("Invalid Semester Code !!!");
  }

  const result = await AcademicSemester.create(paylod);

  return result;
};

// get all semester
const getAllAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get all semester
const findByIdAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// get all semester
const findByIdAndUpdateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  // console.log(payload.code)
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterCodeAndYearMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code !");
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
  findByIdAcademicSemester,
  findByIdAndUpdateAcademicSemester,
};
