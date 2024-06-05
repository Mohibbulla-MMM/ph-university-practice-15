import { z } from "zod";

export const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
    academicFaculty: z.string({
      required_error: "academicFaculty is required",
    }),
  }),
});

export const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
