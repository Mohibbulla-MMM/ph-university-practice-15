"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const offeredCourse_controllers_1 = require("./offeredCourse.controllers");
const router = (0, express_1.Router)();
router.post("/create-offered-course", (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidation.offeredCourseSchema), offeredCourse_controllers_1.OfferedCourseControllers.createOfferedCourse);
router.get("/", offeredCourse_controllers_1.OfferedCourseControllers.getAllOfferedCourse);
router.get("/:id", offeredCourse_controllers_1.OfferedCourseControllers.getSingleOfferedCourse);
router.patch("/:id", (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidation.updatedOfferedCourseSchema), offeredCourse_controllers_1.OfferedCourseControllers.updateOfferedCourse);
exports.OfferedCourseRouter = router;
