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
exports.OfferedCourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const offeredCourse_model_1 = __importDefault(require("./offeredCourse.model"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_mode_1 = require("../academicFaculty/academicFaculty.mode");
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
//  create Semester Registration
const createOfferedCourseInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicDepartment, academicFaculty, course, section, days, startTime, endTime, faculty, } = payload;
    // Types.ObjectId.isValid(semesterRegistration);
    // semesterRegistration id chaking
    const isSemesterRegistrationExiste = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Semester Registration not found!");
    }
    const academicSemester = isSemesterRegistrationExiste.academicSemester;
    // Academic Department id chaking
    const isAcademicDepartmentExiste = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Academic Department not found!");
    }
    // Academic Department id chaking
    const isAcademicFacultyExiste = yield academicFaculty_mode_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Academic Faculty not found!");
    }
    // course id chaking
    const iscourseExiste = yield course_model_1.Course.findById(course);
    if (!iscourseExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    // faculty id chaking
    const isFacultyExiste = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Faculty not found!");
    }
    // check if the depertment is belong to the faculty
    const isDepertmeBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        _id: academicDepartment, // not use
        academicFaculty,
    });
    // academicDepartment,
    if (!isDepertmeBelongToFaculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `This "${isAcademicDepartmentExiste.name}" is not belong to This "${isAcademicFacultyExiste.name}" faculty`);
    }
    // cheking same offered course with same section
    const isOfferedCourseWithSameSectionExist = yield offeredCourse_model_1.default.findOne({
        course,
        section,
        semesterRegistration,
    });
    if (isOfferedCourseWithSameSectionExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `This Offered course with same section already exist !`);
    }
    // get the shedule of the faculty
    const assignShedule = yield offeredCourse_model_1.default.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    // console.log(assignShedule);
    const newShedule = {
        startTime,
        endTime,
        days,
    };
    if ((0, offeredCourse_utils_1.facultyTimeConflict)(newShedule, assignShedule)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This Faculty is not avilable at that time. Choose others time or day !");
    }
    // return true;
    const result = yield offeredCourse_model_1.default.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
//  get all Semester Registration
const getAllOfferedCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(offeredCourse_model_1.default.find(), query)
        .search(offeredCourse_constant_1.searchFields)
        .filter()
        .fields()
        .patginate()
        .sort();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
//  get single Semester Registration
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_model_1.default.findById(id);
    return result;
});
//  get single Semester Registration
const updateOfferedCourseInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, startTime, endTime, days } = payload;
    // chaking offered course existe
    const isOfferedCourseExiste = yield offeredCourse_model_1.default.findById(id);
    if (!isOfferedCourseExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Offered Course not found`);
    }
    // faculty chaking
    const isFacultyExiste = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Faculty is not found`);
    }
    const semesterRegistration = isOfferedCourseExiste === null || isOfferedCourseExiste === void 0 ? void 0 : isOfferedCourseExiste.semesterRegistration;
    // chaking offered course status
    const chakingSemesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    const status = chakingSemesterRegistrationStatus === null || chakingSemesterRegistrationStatus === void 0 ? void 0 : chakingSemesterRegistrationStatus.status;
    if (status !== "UPCOMMING") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You cann't update this offered course, it is ${status}`);
    }
    // get the shedule of the faculty
    const assignShedule = yield offeredCourse_model_1.default.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    // console.log(assignShedule);
    const newShedule = {
        startTime,
        endTime,
        days,
    };
    if ((0, offeredCourse_utils_1.facultyTimeConflict)(newShedule, assignShedule)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This Faculty is not avilable at that time. Choose others time or day !");
    }
    return null;
    const result = yield offeredCourse_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return "result";
});
exports.OfferedCourseServices = {
    createOfferedCourseInToDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseInToDB,
};
