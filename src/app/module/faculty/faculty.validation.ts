import { z } from "zod";
import { BloodGroup, Gender } from "./faculty.constant";

// Define constants

// Define Zod schemas
const UserNameSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const FacultySchemaValidation = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      designation: z.string().min(1, { message: "Designation is required" }),
      name: UserNameSchema,
      gender: z.enum(Gender as [string, ...string[]], {
        message: "Gender must be one of the specified values",
      }),
      dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      contactNo: z.string().min(1, { message: "Contact number is required" }),
      emargencyContactNo: z.string().optional(),
      bloodGroup: z.enum(BloodGroup as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: "presentAddress this field is required",
      }),
      permanentAddress: z.string({
        required_error: "permanentAddress this field is required",
      }),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
const UserNameUpdateSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const FacultyUpdateSchemaValidation = z.object({
  body: z.object({
    designation: z.string().optional(),
    name: UserNameUpdateSchema,
    gender: z
      .enum(Gender as [string, ...string[]], {
        message: "Gender must be one of the specified values",
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    contactNo: z.string().min(1).optional(),
    emargencyContactNo: z.string().optional(),
    bloodGroup: z.enum(BloodGroup as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export { FacultySchemaValidation, FacultyUpdateSchemaValidation };
