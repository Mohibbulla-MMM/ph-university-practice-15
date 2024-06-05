import { z } from "zod";

// -------------schema ---------------

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

const courseSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required" }),
    prefix: z.string({ required_error: "prefix is required" }),
    code: z.number({ required_error: "code is required" }),
    credits: z.number({ required_error: "credits is required" }),
    isDeleted: z.boolean().default(false),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

// -------------updated schema ---------------
const updatedPreRequisiteCoursesValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

const updatedCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().default(false),
    preRequisiteCourses: z
      .array(updatedPreRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

export const CourseValidation = {
  courseSchema,
  updatedCourseSchema,
};
