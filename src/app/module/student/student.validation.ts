import { z } from "zod";

// Zod Schemas
const userNameSchemaValidation = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
});

const guardiantSchemaValidation = z.object({
  fatherName: z.string({ required_error: "Father's name is required" }),
  fathercontact: z.string({ required_error: "Father's contact is required" }),
  fatheroccupation: z.string({
    required_error: "Father's occupation is required",
  }),
  motherName: z.string({ required_error: "Mother's name is required" }),
  mothercontact: z.string({ required_error: "Mother's contact is required" }),
  motheroccupation: z.string({
    required_error: "Mother's occupation is required",
  }),
});

const localGuardiantSchemaValidation = z.object({
  name: z.string({ required_error: "Local guardian's name is required" }),
  address: z.string({ required_error: "Local guardian's address is required" }),
  contact: z.string({ required_error: "Local guardian's contact is required" }),
});

const permanentAddressSchemaValidation = z.object({
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
  postCode: z.string({ required_error: "Postcode is required" }),
  village: z.string({ required_error: "Village is required" }),
});

const presentAddressSchemaValidation = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  postCode: z.string().optional(),
  village: z.string().optional(),
});

export const studentSchemaValidation = z.object({
  body: z.object({
    password: z.string({ required_error: "password is required" }).optional(),
    student: z.object({
      name: userNameSchemaValidation,
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
      contact: z.string({ required_error: "Contact number is required" }),
      emargencyContactNo: z.string({
        required_error: "Emergency contact number is required",
      }),
      dateOfBirth: z.string().optional(),
      gender: z
        .enum(["male", "female", "other"], {
          required_error: "Gender is required",
        })
        .optional(),
      guardiant: guardiantSchemaValidation,
      localGuardiant: localGuardiantSchemaValidation,
      permanentAddress: permanentAddressSchemaValidation,
      presentAddress: presentAddressSchemaValidation,
      // profileImage: z.string({ required_error: "Profile image is required" }),
      admissionSemester: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});
// isDeleted: z.boolean().optional(),

export const StudentSchemaValidations = {
  studentSchemaValidation,
};
