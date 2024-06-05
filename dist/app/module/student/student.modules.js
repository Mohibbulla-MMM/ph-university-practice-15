"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
// student user name schema
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
// student guardiant schema
const guardiantShema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fathercontact: { type: String, required: true },
    fatheroccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    mothercontact: { type: String, required: true },
    motheroccupation: { type: String, required: true },
});
// local guardian schema
const localGuardiantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
});
// permanent Address schema
const permanentAddressShema = new mongoose_1.Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    postCode: { type: String, required: true },
    village: { type: String, required: true },
});
// presenst address schema
const presentAddressSchema = new mongoose_1.Schema({
    city: { type: String },
    country: { type: String },
    postCode: { type: String },
    village: { type: String },
});
// --- student main schema ----
exports.studentSchema = new mongoose_1.Schema({
    name: { type: userNameSchema, required: true },
    id: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User",
    },
    bloodGroup: {
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    emargencyContactNo: { type: String, required: true },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
        },
    },
    guardiant: {
        type: guardiantShema,
        required: true,
    },
    localGuardiant: {
        type: localGuardiantSchema,
        required: true,
    },
    permanentAddress: {
        type: permanentAddressShema,
        required: true,
    },
    presentAddress: {
        type: presentAddressSchema,
        required: true,
    },
    profileImage: { type: String, required: true },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemester",
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.studentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = this.getQuery();
        // console.log(id);
        const student = yield exports.Student.findOne(id);
        // console.log(student);
        if (!student) {
            console.log("inside call");
            return next(new Error("Student dosen't exists"));
        }
        next();
    });
});
// throw new AppError(httpStatus.NOT_FOUND, "Student dosen't exists");
exports.Student = (0, mongoose_1.model)("Students", exports.studentSchema);
