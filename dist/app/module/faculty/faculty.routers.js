"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRouter = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controllers_1 = require("./faculty.controllers");
const router = express_1.default.Router();
router.get("/", faculty_controllers_1.FacultyControllers.getAllFaculty);
router.get("/:id", faculty_controllers_1.FacultyControllers.getSingleFaculty);
router.patch("/:id", faculty_controllers_1.FacultyControllers.updatedFaculty);
router.delete("/:id", faculty_controllers_1.FacultyControllers.deletedFaculty);
exports.FacultyRouter = router;
