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
exports.SemesterRegistrationControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const semesterRegistration_services_1 = require("./semesterRegistration.services");
const createSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_services_1.SemesterRegistrationServices.createSemesterRegistrationInToDB(req.body);
    (0, sendRespons_1.default)(res, {
        message: "Create Semester Registration Success !",
        data: result,
    });
}));
const getAllSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_services_1.SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);
    (0, sendRespons_1.default)(res, {
        message: "Semester Registrations retrived Successfully !",
        data: result,
    });
}));
const getSingleSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semesterRegistration_services_1.SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    (0, sendRespons_1.default)(res, {
        message: "Semester Registration retrive Successfully !",
        data: result,
    });
}));
const updateSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semesterRegistration_services_1.SemesterRegistrationServices.updateSemesterRegistrationInToDB(id, req.body);
    (0, sendRespons_1.default)(res, {
        message: "Updated Semester Registration Success !",
        data: result,
    });
}));
exports.SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
};
