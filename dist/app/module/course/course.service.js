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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const course_constatnt_1 = require("./course.constatnt");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCourseFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find(), query)
        .search(course_constatnt_1.searchableFields)
        .filter()
        .patginate()
        .sort()
        .fields();
    const result = yield courseQuery.modelQuery.populate("preRequisiteCourses.course");
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate("preRequisiteCourses.course");
    return result;
});
const updateCourseInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { preRequisiteCourses } = payload, courseRemainingData = __rest(payload, ["preRequisiteCourses"]);
    // try {
    //   session.startTransaction();
    //   const basicCourseUpdate = await Course.findByIdAndUpdate(
    //     id,
    //     courseRemainingData,
    //     { new: true, session }
    //   );
    //   if (!basicCourseUpdate) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
    //   }
    //   if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    //     // remove prerequisite course ------------------------
    //     const deletedPrequiesit = preRequisiteCourses
    //       ?.filter((element) => element.course && element.isDeleted)
    //       ?.map((el) => el.course);
    //     const remodePrereqisite = await Course.findByIdAndUpdate(
    //       id,
    //       {
    //         $pull: {
    //           preRequisiteCourses: { course: { $in: deletedPrequiesit } },
    //         },
    //       },
    //       { new: true, runValidators: true, session }
    //     );
    //     if (!remodePrereqisite) {
    //       throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
    //     }
    //     // add prerequisite course ------------------------
    //     const addPrerequisiteCourse = preRequisiteCourses?.filter(
    //       (el) => el.course && !el.isDeleted
    //     );
    //     console.log(addPrerequisiteCourse);
    //     const addPrerequisite = await Course.findByIdAndUpdate(
    //       id,
    //       {
    //         $addToSet: {
    //           preRequisiteCourses: { $each: addPrerequisiteCourse },
    //         },
    //       },
    //       {
    //         runValidators: true,
    //         new: true,
    //         session,
    //       }
    //     );
    //     if (!addPrerequisite) {
    //       throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course !");
    //     }
    //   }
    //   await session.commitTransaction();
    //   await session.endSession();
    //   const result = await Course.findById(id);
    //   return result;
    // }
    try {
        session.startTransaction();
        //step1: basic course info update
        const updatedBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedBasicCourseInfo) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update course!");
        }
        // check if there is any pre requisite courses to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out the deleted fields
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const deletedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!deletedPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update course!");
            }
            // filter out the new course fields
            const newPreRequisites = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
            console.log(newPreRequisites);
            const newPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: { $each: newPreRequisites },
                },
            }, {
                _id: 0,
                new: true,
                runValidators: true,
                session,
            });
            if (!newPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update course!");
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield course_model_1.Course.findById(id);
        // .populate(
        //   "preRequisiteCourses.course"
        // );
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update course !");
    }
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
// assignment faculty with coruse
const assignFacultyWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, { upsert: true, new: true });
    return result;
});
// removed faculty with coruse
const removeFacultyFromCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
exports.CourseServices = {
    createCourseFromDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseInToDB,
    deleteCourseFromDB,
    assignFacultyWithCourseIntoDB,
    removeFacultyFromCourseIntoDB,
};
