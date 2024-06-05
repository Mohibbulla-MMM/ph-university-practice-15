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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFacultyId = exports.generateAdminId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
// -------------------- generated student id -------------
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: "student" }, {
        id: 1,
        _id: 1,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    const id = (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
    //   console.log(lastStudent);
    return id;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let curentId = (0).toString();
    // const //
    // console.log(payload?._id)
    const lastStudentId = yield findLastStudentId();
    const lastSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const lastSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const currentSemesterYear = payload === null || payload === void 0 ? void 0 : payload.year;
    const currentSemesterCode = payload === null || payload === void 0 ? void 0 : payload.code;
    // console.log({ lastStudentId });
    // console.log({ lastSemesterYear });
    if (lastStudentId &&
        lastSemesterCode === currentSemesterCode &&
        lastSemesterYear === currentSemesterYear) {
        curentId = lastStudentId.substring(6);
    }
    // console.log({ curentId });
    const generateId = (Number(curentId) + 1).toString().padStart(4, "0");
    // console.log({ generateId });
    const originalId = `${payload.year}${payload.code}${generateId}`;
    // console.log(await findLastStudentId(), "------------");
    return originalId;
});
exports.generateStudentId = generateStudentId;
// -------------------- generated admin id -------------
const findLastAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({ role: "admin" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    // console.log(lastAdmin?.id.substring(2));
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield findLastAdmin();
    if (lastAdminId) {
        currentId = lastAdminId;
    }
    const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    const generatedId = `A-${incrementId}`;
    return generatedId;
});
exports.generateAdminId = generateAdminId;
// -------------------- generated admin id -------------
const findLastFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    // console.log(lastFaculty?.id.substring(2));
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastFacultyId = yield findLastFaculty();
    console.log({ lastFacultyId });
    if (lastFacultyId) {
        currentId = lastFacultyId;
    }
    const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    const generatedId = `F-${incrementId}`;
    return generatedId;
});
exports.generateFacultyId = generateFacultyId;
