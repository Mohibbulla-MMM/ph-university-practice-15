import express from "express";
import { UserControllers } from "./user.controllers";
import validateRequest from "../../utils/validateRequest";
import { studentSchemaValidation } from "../student/student.validation";
import { FacultySchemaValidation } from "../faculty/faculty.validation";
import { AdminSchemaValidation } from "../admin/admin.validation";

const router = express.Router();

// created users
router.post(
  "/create-user",
  validateRequest(studentSchemaValidation),
  UserControllers.createStudent
);

// created Admin
router.post(
  "/create-admin",
  validateRequest(AdminSchemaValidation),
  UserControllers.createAdmin
);

// created faculty
router.post(
  "/create-faculty",
  validateRequest(FacultySchemaValidation),
  UserControllers.createFacultry
);

// find all users
router.get("/", UserControllers.findAllUsers);

export const UserRouter = router;
