import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controllers";
import {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
} from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
  // validateRequest(createAcademicDepartmentValidation),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.patch(
  "/:DepartmentId",
  validateRequest(updateAcademicDepartmentValidation),
  AcademicDepartmentControllers.updateAcademicDepartment
);

router.get(
  "/:DepartmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);

export const AcademicDepartmentRouter = router;
