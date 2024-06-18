import express from "express";
import { FacultyControllers } from "./faculty.controllers";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculty
);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch("/:id", FacultyControllers.updatedFaculty);

router.delete("/:id", FacultyControllers.deletedFaculty);

export const FacultyRouter = router;
