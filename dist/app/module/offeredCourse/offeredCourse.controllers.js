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
exports.OfferedCourseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const offeredCourse_services_1 = require("./offeredCourse.services");
const createOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_services_1.OfferedCourseServices.createOfferedCourseInToDB(req.body);
    (0, sendRespons_1.default)(res, {
        message: "Create Offered Course Success !",
        data: result,
    });
}));
const getAllOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_services_1.OfferedCourseServices.getAllOfferedCourseFromDB(req.query);
    (0, sendRespons_1.default)(res, {
        message: "Offered Courses retrived Successfully !",
        data: result,
    });
}));
const getSingleOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield offeredCourse_services_1.OfferedCourseServices.getSingleOfferedCourseFromDB(id);
    (0, sendRespons_1.default)(res, {
        message: "Offered Course retrive Successfully !",
        data: result,
    });
}));
const updateOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield offeredCourse_services_1.OfferedCourseServices.updateOfferedCourseInToDB(id, req.body);
    (0, sendRespons_1.default)(res, {
        message: "Updated Offered Course Successfully !",
        data: result,
    });
}));
exports.OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse,
};
