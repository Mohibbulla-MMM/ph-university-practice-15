"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdatedSchemaValidation = exports.AdminSchemaValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
// Define Zod schemas
const UserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    middleName: zod_1.z.string().min(1, { message: "Middle name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
});
const AdminSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "password is required" }),
        admin: zod_1.z.object({
            designation: zod_1.z.string().min(1, { message: "Designation is required" }),
            name: UserNameSchema,
            gender: zod_1.z.enum(admin_constant_1.Gender, {
                message: "Gender must be one of the specified values",
            }),
            dateOfBirth: zod_1.z.string().min(1, { message: "Date of birth is required" }),
            email: zod_1.z.string().email({ message: "Invalid email address" }),
            contactNo: zod_1.z.string().min(1, { message: "Contact number is required" }),
            emargencyContactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(admin_constant_1.BloodGroup, {
                message: "Blood group must be one of the specified values",
            })
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, { message: "Present address is required" }),
            permanentAddress: zod_1.z.string({ message: "Permanent address is required" }),
            profileImage: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().optional(),
        }),
    }),
});
exports.AdminSchemaValidation = AdminSchemaValidation;
// updated validation data -----------------
const UserNameUpdatedSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    middleName: zod_1.z.string().min(1, { message: "Middle name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
});
const AdminUpdatedSchemaValidation = zod_1.z.object({
    designation: zod_1.z.string().min(1, { message: "Designation is required" }),
    name: UserNameUpdatedSchema,
    gender: zod_1.z.enum(admin_constant_1.Gender, {
        message: "Gender must be one of the specified values",
    }),
    dateOfBirth: zod_1.z.string().min(1, { message: "Date of birth is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    contactNo: zod_1.z.string().min(1, { message: "Contact number is required" }),
    emargencyContactNo: zod_1.z.string().optional(),
    bloodGroup: zod_1.z
        .enum(admin_constant_1.BloodGroup, {
        message: "Blood group must be one of the specified values",
    })
        .optional(),
    presentAddress: zod_1.z.string().min(1, { message: "Present address is required" }),
    permanentAddress: zod_1.z
        .string()
        .min(1, { message: "Permanent address is required" }),
    profileImage: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.AdminUpdatedSchemaValidation = AdminUpdatedSchemaValidation;
