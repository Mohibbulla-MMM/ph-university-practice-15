"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const course_service_1 = require("./course.service");
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.createCourseFromDB(req.body);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course created successfull!",
    });
}));
const getAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getAllCourseFromDB(req.query);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find all Course success!",
    });
}));
const getSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.getSingleCourseFromDB(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course is retrive success!",
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.updateCourseInToDB(id, req.body);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course has been successfully updated ! ",
    });
}));
const deletedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.deleteCourseFromDB(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course is Deleted successfully ! ",
    });
}));
const assignFacultyWithCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.assignFacultyWithCourseIntoDB(id, faculties);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course-Faculty is Updated successfully !",
    });
}));
const removeFacultyFromCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.removeFacultyFromCourseIntoDB(id, faculties);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Course-Faculty is deleted successfully !",
    });
}));
exports.CourseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deletedCourse,
    assignFacultyWithCourse,
    removeFacultyFromCourse,
};
