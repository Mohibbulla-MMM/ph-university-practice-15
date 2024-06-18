"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidation = void 0;
const zod_1 = require("zod");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
// const ObjectId = z.instanceof(Types.ObjectId);
const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const timeSchema = zod_1.z.string().regex(regex, {
    message: `invalid time formate. expected "HH:MM" in 24 hours formate.`,
});
const offeredCourseSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string(),
        // academicSemester: z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z
            .number()
            .min(0, "Max capacity must be a non-negative number"),
        section: zod_1.z.number().min(0, "Section must be a non-negative number"),
        days: zod_1.z.array(zod_1.z.enum(offeredCourse_constant_1.Days)),
        startTime: timeSchema,
        endTime: timeSchema,
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
    }, {
        message: `Start time should be before the end time`,
    }),
});
const updatedOfferedCourseSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z
            .number()
            .min(0, "Max capacity must be a non-negative number"),
        days: zod_1.z.array(zod_1.z.enum(offeredCourse_constant_1.Days)),
        startTime: timeSchema,
        endTime: timeSchema,
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
    }, {
        message: `Start time should be before the end time`,
    }),
});
// Example usage
exports.OfferedCourseValidation = {
    offeredCourseSchema,
    updatedOfferedCourseSchema,
};
//  startTime: z.string().refine(
//     (time) => {
//       const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
//       const result = regex.test(time);
//       return result;
//     },
//     {
//       message: `invalid time formate. expected "HH:MM" in 24 hours formate.`,
//     }
//   ),
//   endTime: z.string().refine(
//     (time) => {
//       const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
//       const result = regex.test(time);
//       return result;
//     },
//     {
//       message: `invalid time formate. expected "HH:MM" in 24 hours formate.`,
//     }
//   ),
