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
exports.AcademicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return resutl;
});
const updateAcademicDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return resutl;
});
const getSingleAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield academicDepartment_model_1.AcademicDepartment.findById(id).populate("academicFaculty");
    return resutl;
});
const getAllAcademicDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield academicDepartment_model_1.AcademicDepartment.find().populate("academicFaculty");
    return resutl;
});
exports.AcademicDepartmentServices = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getSingleAcademicDepartment,
    getAllAcademicDepartment,
};
