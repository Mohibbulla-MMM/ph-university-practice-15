"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const adminNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const facultySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    designation: { type: String, required: true },
    name: adminNameSchema,
    gender: {
        type: String,
        enum: faculty_constant_1.Gender,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emargencyContactNo: { type: String },
    bloodGroup: {
        type: String,
        enum: faculty_constant_1.BloodGroup,
    },
    presentAddress: String,
    permanentAddress: String,
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Faculty = (0, mongoose_1.model)("Faculty", facultySchema);
