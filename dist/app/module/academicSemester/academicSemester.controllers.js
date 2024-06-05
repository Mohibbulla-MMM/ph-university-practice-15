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
exports.AcademicSemesterControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const academicSemester_services_1 = require("./academicSemester.services");
// create academic semester
const createAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield academicSemester_services_1.AcademicSemesterServices.createAcademicSemester(data);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic semester create success !",
        data: result,
    });
}));
// get all academic semester
const getAllAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.AcademicSemesterServices.getAllAcademicSemester();
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get all academic semester success !",
        data: result,
    });
}));
// get all academic semester
const findByIdAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.academicSemesterId;
    const result = yield academicSemester_services_1.AcademicSemesterServices.findByIdAcademicSemester(id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Find a academic semester success !",
        data: result,
    });
}));
// get all academic semester
const findByIdAndUpdateAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.academicSemesterId;
    const result = yield academicSemester_services_1.AcademicSemesterServices.findByIdAndUpdateAcademicSemester(id, req.body);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Update a academic semester success !",
        data: result,
    });
}));
// export academic semester controllers
exports.AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    findByIdAcademicSemester,
    findByIdAndUpdateAcademicSemester
};
