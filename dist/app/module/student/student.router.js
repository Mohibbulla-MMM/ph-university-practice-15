"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("./student.controllers");
const router = express_1.default.Router();
router.get("/", student_controllers_1.StudentControllers.findAllStudent);
router.get("/:id", student_controllers_1.StudentControllers.findSingleStudent);
router.patch("/:id", student_controllers_1.StudentControllers.singleStudentUpdate);
router.delete("/:id", student_controllers_1.StudentControllers.singleStudentDeleted);
exports.StudentRouter = router;
