import { Router } from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import validateRequest from "../../utils/validateRequest";
import {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
} from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty
);
router.patch(
  "/:facultyId",
  validateRequest(updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty
);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);

export const AcademicFacultyRouter = router;
