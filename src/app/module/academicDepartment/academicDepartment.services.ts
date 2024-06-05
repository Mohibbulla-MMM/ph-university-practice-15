import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const resutl = await AcademicDepartment.create(payload);
  return resutl;
};

const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment
) => {
  const resutl = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return resutl;
};

const getSingleAcademicDepartment = async (id: string) => {
  const resutl = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );
  return resutl;
};

const getAllAcademicDepartment = async () => {
  const resutl = await AcademicDepartment.find().populate("academicFaculty");
  return resutl;
};

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicDepartment,
};
