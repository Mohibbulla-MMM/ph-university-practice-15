"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAcademicSemesterSchemaValidation = exports.CreateAcademicSemesterSchemaValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
// create  academic semester schema validation
exports.CreateAcademicSemesterSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterName]),
        year: zod_1.z.string(),
        code: zod_1.z.enum(academicSemester_constant_1.AcademicSemesterCode),
        startMonth: zod_1.z.enum(academicSemester_constant_1.Months),
        endMonth: zod_1.z.enum(academicSemester_constant_1.Months),
    }),
});
// update academic semester schema validation
exports.UpdateAcademicSemesterSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterName]).optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z.enum(academicSemester_constant_1.AcademicSemesterCode).optional(),
        startMonth: zod_1.z.enum(academicSemester_constant_1.Months).optional(),
        endMonth: zod_1.z.enum(academicSemester_constant_1.Months).optional(),
    }),
});
