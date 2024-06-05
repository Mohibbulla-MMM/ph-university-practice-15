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
exports.AcademicSemesterServices = void 0;
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_module_1 = require("./academicSemester.module");
// create semester
const createAcademicSemester = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.AcademicSemesterCodeAndYearMapper[paylod.name] !== paylod.code) {
        throw new Error("Invalid Semester Code !!!");
    }
    const result = yield academicSemester_module_1.AcademicSemester.create(paylod);
    return result;
});
// get all semester
const getAllAcademicSemester = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_module_1.AcademicSemester.find();
    return result;
});
// get all semester
const findByIdAcademicSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_module_1.AcademicSemester.findById(id);
    return result;
});
// get all semester
const findByIdAndUpdateAcademicSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload.code)
    if (payload.name &&
        payload.code &&
        academicSemester_constant_1.AcademicSemesterCodeAndYearMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code !");
    }
    const result = yield academicSemester_module_1.AcademicSemester.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemester,
    getAllAcademicSemester,
    findByIdAcademicSemester,
    findByIdAndUpdateAcademicSemester,
};
