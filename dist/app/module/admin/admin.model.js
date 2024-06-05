"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const adminNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const adminSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    designation: { type: String, required: true },
    name: adminNameSchema,
    gender: {
        type: String,
        enum: admin_constant_1.Gender,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emargencyContactNo: { type: String },
    bloodGroup: {
        type: String,
        enum: admin_constant_1.BloodGroup,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
