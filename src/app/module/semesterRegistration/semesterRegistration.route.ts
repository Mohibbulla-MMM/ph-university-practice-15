import { Router } from "express";
import { SemesterRegistrationControllers } from "./semesterRegistration.controllers";
import validateRequest from "../../utils/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(SemesterRegistrationValidation.semesterRegistrationSchema),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);

router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

export const SemesterRegistrationRouter = router;
