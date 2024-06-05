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
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_module_1 = require("../academicSemester/academicSemester.module");
const student_modules_1 = require("../student/student.modules");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("../admin/admin.model");
const faculty_model_1 = require("../faculty/faculty.model");
// create sutdent
const createStudent = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_password;
    const admissionSemester = yield academicSemester_module_1.AcademicSemester.findById(payload.admissionSemester);
    userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
    userData.role = "student";
    // session start
    const session = yield mongoose_1.default.startSession();
    try {
        // transaction start
        session.startTransaction();
        // session-1
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User create faild!");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // session-2
        const createStudent = yield student_modules_1.Student.create([payload], { session });
        if (!createStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student create faild!");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
    }
    //   return newUser;
});
// create admin
const createAdmin = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_password;
    userData.id = yield (0, user_utils_1.generateAdminId)();
    userData.role = "admin";
    // session start
    const session = yield mongoose_1.default.startSession();
    try {
        // transaction start
        session.startTransaction();
        // session-1
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User create faild!");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // session-2
        const createAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!createAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student create faild!");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err);
    }
    //   return newUser;
});
// create admin --------------
const createFacultry = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_password;
    userData.id = yield (0, user_utils_1.generateFacultyId)();
    // userData.id = "F-0001";
    userData.role = "faculty";
    console.log("faculty ------------------------");
    // session start
    const session = yield mongoose_1.default.startSession();
    try {
        // transaction start
        session.startTransaction();
        // session-1
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User create faild!");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // session-2
        const createAdmin = yield faculty_model_1.Faculty.create([payload], { session });
        if (!createAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Faculty create faild!");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err);
    }
    //   return newUser;
});
// find all users
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
exports.UserServices = {
    createStudent,
    createAdmin,
    createFacultry,
    findAllUsers,
};
