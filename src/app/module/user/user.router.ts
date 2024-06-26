import express, { NextFunction, Request, Response, json } from "express";
import { UserControllers } from "./user.controllers";
import validateRequest from "../../utils/validateRequest";
import { studentSchemaValidation } from "../student/student.validation";
import { FacultySchemaValidation } from "../faculty/faculty.validation";
import { AdminSchemaValidation } from "../admin/admin.validation";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

// created users
router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  // validateRequest(studentSchemaValidation),
  (req: Request, res: Response, next: NextFunction) => {
    // req.file = req.file
    req.body = JSON.parse(req.body?.data);
    next();
  },

  UserControllers.createStudent
);

// created Admin
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(AdminSchemaValidation),
  UserControllers.createAdmin
);

// created faculty
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(FacultySchemaValidation),
  UserControllers.createFacultry
);

// find all users
router.get("/", auth("faculty", "admin"), UserControllers.findAllUsers);

// get me
router.get("/me", auth("admin", "faculty", "student"), UserControllers.findMe);

// user status change
router.post(
  "/change-status/:id",
  auth("admin"),
  validateRequest(UserValidation.userStatusSchema),

  UserControllers.changeUserStatus
);

export const UserRouter = router;
