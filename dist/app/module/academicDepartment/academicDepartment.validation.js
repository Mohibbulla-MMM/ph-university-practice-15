"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicDepartmentValidation = exports.createAcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
exports.createAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name is required" }),
        academicFaculty: zod_1.z.string({
            required_error: "academicFaculty is required",
        }),
    }),
});
exports.updateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
