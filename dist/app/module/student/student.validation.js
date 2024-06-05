"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchemaValidations = exports.studentSchemaValidation = void 0;
const zod_1 = require("zod");
// Zod Schemas
const userNameSchemaValidation = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First name is required" }),
    lastName: zod_1.z.string({ required_error: "Last name is required" }),
});
const guardiantSchemaValidation = zod_1.z.object({
    fatherName: zod_1.z.string({ required_error: "Father's name is required" }),
    fathercontact: zod_1.z.string({ required_error: "Father's contact is required" }),
    fatheroccupation: zod_1.z.string({
        required_error: "Father's occupation is required",
    }),
    motherName: zod_1.z.string({ required_error: "Mother's name is required" }),
    mothercontact: zod_1.z.string({ required_error: "Mother's contact is required" }),
    motheroccupation: zod_1.z.string({
        required_error: "Mother's occupation is required",
    }),
});
const localGuardiantSchemaValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Local guardian's name is required" }),
    address: zod_1.z.string({ required_error: "Local guardian's address is required" }),
    contact: zod_1.z.string({ required_error: "Local guardian's contact is required" }),
});
const permanentAddressSchemaValidation = zod_1.z.object({
    city: zod_1.z.string({ required_error: "City is required" }),
    country: zod_1.z.string({ required_error: "Country is required" }),
    postCode: zod_1.z.string({ required_error: "Postcode is required" }),
    village: zod_1.z.string({ required_error: "Village is required" }),
});
const presentAddressSchemaValidation = zod_1.z.object({
    city: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    postCode: zod_1.z.string().optional(),
    village: zod_1.z.string().optional(),
});
exports.studentSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "password is required" }),
        student: zod_1.z.object({
            name: userNameSchemaValidation,
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            email: zod_1.z
                .string({ required_error: "Email is required" })
                .email({ message: "Invalid email address" }),
            contact: zod_1.z.string({ required_error: "Contact number is required" }),
            emargencyContactNo: zod_1.z.string({
                required_error: "Emergency contact number is required",
            }),
            dateOfBirth: zod_1.z.string().optional(),
            gender: zod_1.z
                .enum(["male", "female", "other"], {
                required_error: "Gender is required",
            })
                .optional(),
            guardiant: guardiantSchemaValidation,
            localGuardiant: localGuardiantSchemaValidation,
            permanentAddress: permanentAddressSchemaValidation,
            presentAddress: presentAddressSchemaValidation,
            profileImage: zod_1.z.string({ required_error: "Profile image is required" }),
            admissionSemester: zod_1.z.string(),
            isDeleted: zod_1.z.boolean().default(false),
        }),
    }),
});
// isDeleted: z.boolean().optional(),
exports.StudentSchemaValidations = {
    studentSchemaValidation: exports.studentSchemaValidation,
};
