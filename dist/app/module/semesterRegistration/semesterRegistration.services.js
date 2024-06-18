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
exports.SemesterRegistrationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_module_1 = require("../academicSemester/academicSemester.module");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
//  create Semester Registration
const createSemesterRegistrationInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check is semester UPCOMMING Or ONGOIN
    const isExisteUpcomingOrOngoingSemester = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semesterRegistration_constant_1.ConstSemseterStatus.UPCOMMING },
            { status: semesterRegistration_constant_1.ConstSemseterStatus.ONGOING },
        ],
    });
    if (isExisteUpcomingOrOngoingSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `There is already an "${isExisteUpcomingOrOngoingSemester.status}" registered semester !`);
    }
    // check academic semester is Exist
    const isAcademicSemesterExiste = yield academicSemester_module_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Academic semester not found  !");
    }
    // console.log("11111111111111111110");
    yield semesterRegistration_model_1.SemesterRegistration.isExisteSemesterRegistrationStaticMethod(academicSemester);
    // console.log("2222222222222222");
    // // check semester registration is Exist
    // const isSemesterRegistrationExiste = await SemesterRegistration.findOne({
    //   academicSemester,
    // });
    // if (isSemesterRegistrationExiste) {
    //   throw new AppError(
    //     httpStatus.CONFLICT,
    //     "This Semester is already Registred !"
    //   );
    // }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
//  get all Semester Registration
const getAllSemesterRegistrationFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find(), query)
        .filter()
        .fields()
        .patginate()
        .sort();
    const result = yield semesterRegistrationQuery.modelQuery.populate("academicSemester");
    return result;
});
//  get single Semester Registration
const getSingleSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    return result;
});
//  get single Semester Registration
const updateSemesterRegistrationInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check semester registration is Exist
    const isSemesterRegistrationExiste = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    const currentSemesterStatus = isSemesterRegistrationExiste === null || isSemesterRegistrationExiste === void 0 ? void 0 : isSemesterRegistrationExiste.status;
    const requestSemesterStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (!isSemesterRegistrationExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Semester is not found !");
    }
    // I will not update if the status is ENDED
    if (currentSemesterStatus === semesterRegistration_constant_1.ConstSemseterStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This Semester is already ${currentSemesterStatus}`);
    }
    // if semester status UPCOMMING and request status ENDED then not updated
    if (currentSemesterStatus === semesterRegistration_constant_1.ConstSemseterStatus.UPCOMMING &&
        requestSemesterStatus === semesterRegistration_constant_1.ConstSemseterStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You cann't direcly change ${currentSemesterStatus} to ${requestSemesterStatus}`);
    }
    // if semester status ONGOING and request status UPCOMMING then not updated
    if (currentSemesterStatus === semesterRegistration_constant_1.ConstSemseterStatus.ONGOING &&
        requestSemesterStatus === semesterRegistration_constant_1.ConstSemseterStatus.UPCOMMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You cann't direcly change ${currentSemesterStatus} to ${requestSemesterStatus}`);
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.SemesterRegistrationServices = {
    createSemesterRegistrationInToDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationInToDB,
};
