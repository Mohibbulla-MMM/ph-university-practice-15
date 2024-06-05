import { string, z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";

// Define Zod schemas
const UserNameSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const AdminSchemaValidation = z.object({
  body: z.object({
    password: z.string({ required_error: "password is required" }),
    admin: z.object({
      designation: z.string().min(1, { message: "Designation is required" }),
      name: UserNameSchema,
      gender: z.enum(Gender as [string, ...string[]], {
        message: "Gender must be one of the specified values",
      }),
      dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      contactNo: z.string().min(1, { message: "Contact number is required" }),
      emargencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(BloodGroup as [string, ...string[]], {
          message: "Blood group must be one of the specified values",
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: "Present address is required" }),
      permanentAddress: z.string({ message: "Permanent address is required" }),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
// updated validation data -----------------

const UserNameUpdatedSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const AdminUpdatedSchemaValidation = z.object({
  designation: z.string().min(1, { message: "Designation is required" }),
  name: UserNameUpdatedSchema,
  gender: z.enum(Gender as [string, ...string[]], {
    message: "Gender must be one of the specified values",
  }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  emargencyContactNo: z.string().optional(),
  bloodGroup: z
    .enum(BloodGroup as [string, ...string[]], {
      message: "Blood group must be one of the specified values",
    })
    .optional(),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z
    .string()
    .min(1, { message: "Permanent address is required" }),
  profileImage: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export { AdminSchemaValidation, AdminUpdatedSchemaValidation };
