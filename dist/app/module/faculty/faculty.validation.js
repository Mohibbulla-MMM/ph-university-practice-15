"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyUpdateSchemaValidation = exports.FacultySchemaValidation = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
// Define constants
// Define Zod schemas
const UserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    middleName: zod_1.z.string().min(1, { message: "Middle name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
});
const FacultySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        faculty: zod_1.z.object({
            designation: zod_1.z.string().min(1, { message: "Designation is required" }),
            name: UserNameSchema,
            gender: zod_1.z.enum(faculty_constant_1.Gender, {
                message: "Gender must be one of the specified values",
            }),
            dateOfBirth: zod_1.z.string().min(1, { message: "Date of birth is required" }),
            email: zod_1.z.string().email({ message: "Invalid email address" }),
            contactNo: zod_1.z.string().min(1, { message: "Contact number is required" }),
            emargencyContactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum(faculty_constant_1.BloodGroup).optional(),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress this field is required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanentAddress this field is required",
            }),
            profileImage: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().optional(),
        }),
    }),
});
exports.FacultySchemaValidation = FacultySchemaValidation;
const UserNameUpdateSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const FacultyUpdateSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        designation: zod_1.z.string().optional(),
        name: UserNameUpdateSchema,
        gender: zod_1.z
            .enum(faculty_constant_1.Gender, {
            message: "Gender must be one of the specified values",
        })
            .optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: "Invalid email address" }).optional(),
        contactNo: zod_1.z.string().min(1).optional(),
        emargencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum(faculty_constant_1.BloodGroup).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.FacultyUpdateSchemaValidation = FacultyUpdateSchemaValidation;
