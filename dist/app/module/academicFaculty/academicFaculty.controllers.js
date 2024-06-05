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
exports.AcademicFacultyControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const academicFaculty_services_1 = require("./academicFaculty.services");
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    //   console.log({ data }, "---------------------------");
    const result = yield academicFaculty_services_1.AcademicFacultyService.createAcademicFaculty(data);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Academic faculty create success !",
        data: result,
    });
}));
const getAllAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.AcademicFacultyService.getAllAcademicFaculty();
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic faculty find all success !",
    });
}));
const getSingleAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield academicFaculty_services_1.AcademicFacultyService.getSingleAcademicFaculty(facultyId);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic faculty find one success !",
    });
}));
const updateAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const data = req.body;
    const result = yield academicFaculty_services_1.AcademicFacultyService.updateAcademicFaculty(facultyId, data);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic faculty update one success !",
    });
}));
exports.AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};
