import { z } from "zod";

export const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "value not valid stringf",
    }),
  }),
});

export const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string(),
  }),
});
