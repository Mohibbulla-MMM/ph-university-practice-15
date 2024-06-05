"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const student_validation_1 = require("../student/student.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const router = express_1.default.Router();
// created users
router.post("/create-user", (0, validateRequest_1.default)(student_validation_1.studentSchemaValidation), user_controllers_1.UserControllers.createStudent);
// created Admin
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.AdminSchemaValidation), user_controllers_1.UserControllers.createAdmin);
// created faculty
router.post("/create-faculty", (0, validateRequest_1.default)(faculty_validation_1.FacultySchemaValidation), user_controllers_1.UserControllers.createFacultry);
// find all users
router.get("/", user_controllers_1.UserControllers.findAllUsers);
exports.UserRouter = router;
