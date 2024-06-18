"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const OfferedCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SemesterRegistration",
        required: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: true,
    },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    faculty: { type: mongoose_1.Schema.Types.ObjectId, ref: "Faculty", required: true },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [{ type: String, enum: offeredCourse_constant_1.Days, required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
}, {
    timestamps: true,
});
// Create and export the Mongoose model
const OfferedCourse = (0, mongoose_1.model)("OfferedCourse", OfferedCourseSchema);
exports.default = OfferedCourse;
