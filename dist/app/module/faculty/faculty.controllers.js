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
exports.FacultyControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const faculty_services_1 = require("./faculty.services");
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("cookie", req.cookies);
    const result = yield faculty_services_1.FacultyServices.getAllFaculty(req.query);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find all Faculty success!",
    });
}));
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_services_1.FacultyServices.getSingleFaculty(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find a Faculty success!",
    });
}));
const updatedFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_services_1.FacultyServices.updatedFaculty(id, req.body);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Update a Faculty success!",
    });
}));
const deletedFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_services_1.FacultyServices.deletedFaculty(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find a Faculty success!",
    });
}));
exports.FacultyControllers = {
    getAllFaculty,
    getSingleFaculty,
    updatedFaculty,
    deletedFaculty,
};
