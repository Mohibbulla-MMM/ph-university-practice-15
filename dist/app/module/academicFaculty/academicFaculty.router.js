"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRouter = void 0;
const express_1 = require("express");
const academicFaculty_controllers_1 = require("./academicFaculty.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = (0, express_1.Router)();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_validation_1.createAcademicFacultyValidation), academicFaculty_controllers_1.AcademicFacultyControllers.createAcademicFaculty);
router.patch("/:facultyId", (0, validateRequest_1.default)(academicFaculty_validation_1.updateAcademicFacultyValidation), academicFaculty_controllers_1.AcademicFacultyControllers.updateAcademicFaculty);
router.get("/:facultyId", academicFaculty_controllers_1.AcademicFacultyControllers.getSingleAcademicFaculty);
router.get("/", academicFaculty_controllers_1.AcademicFacultyControllers.getAllAcademicFaculty);
exports.AcademicFacultyRouter = router;
