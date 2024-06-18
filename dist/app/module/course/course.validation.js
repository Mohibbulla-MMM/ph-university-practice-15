"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
// -------------schema ---------------
const preRequisiteCoursesValidationSchema = zod_1.z.object({
    course: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
const courseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }),
        prefix: zod_1.z.string({ required_error: "prefix is required" }),
        code: zod_1.z.number({ required_error: "code is required" }),
        credits: zod_1.z.number({ required_error: "credits is required" }),
        isDeleted: zod_1.z.boolean().default(false),
        preRequisiteCourses: zod_1.z
            .array(preRequisiteCoursesValidationSchema)
            .optional(),
    }),
});
// -------------updated schema ---------------
const updatedPreRequisiteCoursesValidationSchema = zod_1.z.object({
    course: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
const updatedCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().default(false),
        preRequisiteCourses: zod_1.z
            .array(updatedPreRequisiteCoursesValidationSchema)
            .optional(),
    }),
});
// course-faculty validation schema
const updatedCourseWithFacyltySchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().optional(),
        faculties: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.CourseValidation = {
    courseSchema,
    updatedCourseSchema,
    updatedCourseWithFacyltySchema,
};
