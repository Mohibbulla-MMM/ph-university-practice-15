"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRouter = void 0;
const express_1 = require("express");
const semesterRegistration_controllers_1 = require("./semesterRegistration.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const router = (0, express_1.Router)();
router.post("/create-semester-registration", (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.semesterRegistrationSchema), semesterRegistration_controllers_1.SemesterRegistrationControllers.createSemesterRegistration);
router.get("/", semesterRegistration_controllers_1.SemesterRegistrationControllers.getAllSemesterRegistration);
router.get("/:id", semesterRegistration_controllers_1.SemesterRegistrationControllers.getSingleSemesterRegistration);
router.patch("/:id", (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.updateSemesterRegistrationSchema), semesterRegistration_controllers_1.SemesterRegistrationControllers.updateSemesterRegistration);
exports.SemesterRegistrationRouter = router;
