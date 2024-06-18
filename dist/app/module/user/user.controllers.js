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
exports.UserControllers = void 0;
const user_services_1 = require("./user.services");
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const result = yield user_services_1.UserServices.createStudent(password, student);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User created success",
        data: result,
    });
}));
// create admin
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin } = req.body;
    const result = yield user_services_1.UserServices.createAdmin(password, admin);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Admin created successfull !!!",
        data: result,
    });
}));
// create admin
const createFacultry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty } = req.body;
    const result = yield user_services_1.UserServices.createFacultry(password, faculty);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Faculty is created successfull !!!",
        data: result,
    });
}));
// find all users
const findAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.findAllUsers();
    (0, sendRespons_1.default)(res, {
        message: "Find all User success",
        data: result,
    });
}));
// find all users
const findMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const result = yield user_services_1.UserServices.findMe(id, role);
    (0, sendRespons_1.default)(res, {
        message: "Find me success",
        data: result,
    });
}));
exports.UserControllers = {
    createStudent,
    createAdmin,
    createFacultry,
    findAllUsers,
    findMe,
};
