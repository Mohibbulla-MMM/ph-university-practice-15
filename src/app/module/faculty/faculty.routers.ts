import express from "express";
import { FacultyControllers } from "./faculty.controllers";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch("/:id", FacultyControllers.updatedFaculty);

router.delete("/:id", FacultyControllers.deletedFaculty);

export const FacultyRouter = router;
