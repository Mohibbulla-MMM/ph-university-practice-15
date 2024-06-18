import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { SemesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationInToDB(
      req.body
    );
  sendRespons(res, {
    message: "Create Semester Registration Success !",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query
    );
  sendRespons(res, {
    message: "Semester Registrations retrived Successfully !",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendRespons(res, {
    message: "Semester Registration retrive Successfully !",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationInToDB(
      id,
      req.body
    );
  sendRespons(res, {
    message: "Updated Semester Registration Success !",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
