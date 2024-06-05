import express from "express";
import { StudentControllers } from "./student.controllers";

const router = express.Router();

router.get("/", StudentControllers.findAllStudent);

router.get("/:id", StudentControllers.findSingleStudent);

router.patch("/:id", StudentControllers.singleStudentUpdate);

router.delete("/:id", StudentControllers.singleStudentDeleted);

export const StudentRouter = router;
