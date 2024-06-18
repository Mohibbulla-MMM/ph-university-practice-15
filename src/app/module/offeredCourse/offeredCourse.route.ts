import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controllers";

const router = Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidation.offeredCourseSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.get("/", OfferedCourseControllers.getAllOfferedCourse);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidation.updatedOfferedCourseSchema),
  OfferedCourseControllers.updateOfferedCourse
);

export const OfferedCourseRouter = router;
