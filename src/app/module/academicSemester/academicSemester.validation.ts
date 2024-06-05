import { string, z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

// create  academic semester schema validation
export const CreateAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum(AcademicSemesterCode as [string, ...string[]]),
    startMonth: z.enum(Months as [string, ...string[]]),
    endMonth: z.enum(Months as [string, ...string[]]),
  }),
});
// update academic semester schema validation
export const UpdateAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum(AcademicSemesterCode as [string, ...string[]]).optional(),
    startMonth: z.enum(Months as [string, ...string[]]).optional(),
    endMonth: z.enum(Months as [string, ...string[]]).optional(),
  }),
});
