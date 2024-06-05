"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controllers_1 = require("./academicSemester.controllers");
const router = (0, express_1.Router)();
// create academic semester
router.post("/create-academic-semester", (0, validateRequest_1.default)(academicSemester_validation_1.CreateAcademicSemesterSchemaValidation), academicSemester_controllers_1.AcademicSemesterControllers.createAcademicSemester);
// find all academic semester
router.get("/find-all-academic-semester", academicSemester_controllers_1.AcademicSemesterControllers.getAllAcademicSemester);
// find by id academic semester
router.get("/:academicSemesterId", academicSemester_controllers_1.AcademicSemesterControllers.findByIdAcademicSemester);
// find by id and update academic semester
router.patch("/:academicSemesterId", (0, validateRequest_1.default)(academicSemester_validation_1.UpdateAcademicSemesterSchemaValidation), academicSemester_controllers_1.AcademicSemesterControllers.findByIdAndUpdateAcademicSemester);
exports.AcademicSemesterRouter = router;
