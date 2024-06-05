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
exports.AcademicDepartmentControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const academicDepartment_services_1 = require("./academicDepartment.services");
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    //   console.log({ data }, "---------------------------");
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.createAcademicDepartment(data);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Academic Department create success !",
        data: result,
    });
}));
const getAllAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getAllAcademicDepartment();
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department find all success !",
    });
}));
const getSingleAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DepartmentId } = req.params;
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getSingleAcademicDepartment(DepartmentId);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department find one success !",
    });
}));
const updateAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DepartmentId } = req.params;
    const data = req.body;
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.updateAcademicDepartment(DepartmentId, data);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department update one success !",
    });
}));
exports.AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
