"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRouter = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controllers_1 = require("./faculty.controllers");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty), faculty_controllers_1.FacultyControllers.getAllFaculty);
router.get("/:id", faculty_controllers_1.FacultyControllers.getSingleFaculty);
router.patch("/:id", faculty_controllers_1.FacultyControllers.updatedFaculty);
router.delete("/:id", faculty_controllers_1.FacultyControllers.deletedFaculty);
exports.FacultyRouter = router;
