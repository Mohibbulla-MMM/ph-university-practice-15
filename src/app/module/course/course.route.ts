import express from "express";
import { CourseControllers } from "./course.controllers";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.courseSchema),
  CourseControllers.createCourse
);

router.get("/", CourseControllers.getAllCourse);

router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidation.updatedCourseSchema),
  CourseControllers.updateCourse
);

router.delete("/:id", CourseControllers.deletedCourse);

router.put(
  "/:id/assign-faculty",
  validateRequest(CourseValidation.updatedCourseWithFacyltySchema),
  CourseControllers.assignFacultyWithCourse
);

router.delete(
  "/:id/remove-faculty",
  validateRequest(CourseValidation.updatedCourseWithFacyltySchema),
  CourseControllers.removeFacultyFromCourse
);

// router.patch("/:id", CourseControllers.updatedCourse);
export const CourseRouter = router;
