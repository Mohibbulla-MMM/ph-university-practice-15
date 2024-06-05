import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { CreateAcademicSemesterSchemaValidation, UpdateAcademicSemesterSchemaValidation } from "./academicSemester.validation";
import { AcademicSemesterControllers } from "./academicSemester.controllers";

const router = Router();

// create academic semester
router.post(
  "/create-academic-semester",
  validateRequest(CreateAcademicSemesterSchemaValidation),
  AcademicSemesterControllers.createAcademicSemester
);

// find all academic semester
router.get(
  "/find-all-academic-semester",
  AcademicSemesterControllers.getAllAcademicSemester
);
// find by id academic semester
router.get(
  "/:academicSemesterId",
  AcademicSemesterControllers.findByIdAcademicSemester
);

// find by id and update academic semester
router.patch(
  "/:academicSemesterId",
  validateRequest(UpdateAcademicSemesterSchemaValidation),
  AcademicSemesterControllers.findByIdAndUpdateAcademicSemester
);

export const AcademicSemesterRouter = router;
