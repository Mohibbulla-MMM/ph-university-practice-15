import { z } from "zod";
import { Days } from "./offeredCourse.constant";

// const ObjectId = z.instanceof(Types.ObjectId);
const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const timeSchema = z.string().regex(regex, {
  message: `invalid time formate. expected "HH:MM" in 24 hours formate.`,
});

const offeredCourseSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      // academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z
        .number()
        .min(0, "Max capacity must be a non-negative number"),
      section: z.number().min(0, "Section must be a non-negative number"),
      days: z.array(z.enum(Days as [string])),
      startTime: timeSchema,
      endTime: timeSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      {
        message: `Start time should be before the end time`,
      }
    ),
});

const updatedOfferedCourseSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z
        .number()
        .min(0, "Max capacity must be a non-negative number"),
      days: z.array(z.enum(Days as [string])),
      startTime: timeSchema,
      endTime: timeSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      {
        message: `Start time should be before the end time`,
      }
    ),
});

// Example usage
export const OfferedCourseValidation = {
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
