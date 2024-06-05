"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicDepartment_controllers_1 = require("./academicDepartment.controllers");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = (0, express_1.Router)();
router.post("/create-academic-department", 
// validateRequest(createAcademicDepartmentValidation),
academicDepartment_controllers_1.AcademicDepartmentControllers.createAcademicDepartment);
router.patch("/:DepartmentId", (0, validateRequest_1.default)(academicDepartment_validation_1.updateAcademicDepartmentValidation), academicDepartment_controllers_1.AcademicDepartmentControllers.updateAcademicDepartment);
router.get("/:DepartmentId", academicDepartment_controllers_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.get("/", academicDepartment_controllers_1.AcademicDepartmentControllers.getAllAcademicDepartment);
exports.AcademicDepartmentRouter = router;
