"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const course_controllers_1 = require("./course.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post("/create-course", (0, validateRequest_1.default)(course_validation_1.CourseValidation.courseSchema), course_controllers_1.CourseControllers.createCourse);
router.get("/", course_controllers_1.CourseControllers.getAllCourse);
router.get("/:id", course_controllers_1.CourseControllers.getSingleCourse);
router.patch("/:id", (0, validateRequest_1.default)(course_validation_1.CourseValidation.updatedCourseSchema), course_controllers_1.CourseControllers.updateCourse);
router.delete("/:id", course_controllers_1.CourseControllers.deletedCourse);
// router.patch("/:id", CourseControllers.updatedCourse);
exports.CourseRouter = router;
