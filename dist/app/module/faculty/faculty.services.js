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
exports.FacultyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
// get all faculty
const getAllFaculty = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(query);
        const faculty = new QueryBuilder_1.default(faculty_model_1.Faculty.find(), query)
            .search(faculty_constant_1.searchField)
            .filter()
            .patginate()
            .sort()
            .fields();
        const result = yield faculty.modelQuery;
        const findfaculty = result === null || result === void 0 ? void 0 : result.length;
        return { findfaculty, result };
    }
    catch (err) {
        // console.log(err);
        return err;
    }
});
// get singgle faculty by _id
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield faculty_model_1.Faculty.findById(id).populate("user");
        return result;
    }
    catch (err) {
        return err;
    }
});
// update singgle faculty by _id
const updatedFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = payload, remainingData = __rest(payload, ["name"]);
        const modifiedUpdatedData = remainingData;
        if (name && Object.keys(name).length) {
            for (const [key, value] of Object.entries(name)) {
                modifiedUpdatedData[`name.${key}`] = value;
            }
        }
        const result = yield faculty_model_1.Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
            new: true,
            runValidators: true,
        }).populate("user");
        return result;
    }
    catch (err) {
        return err;
    }
});
// deleted singgle faculty by _id
const deletedFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // faculty update and session 1
        const faculty = yield faculty_model_1.Faculty.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session }).populate("user");
        if (!faculty) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete faculty");
        }
        // user update and session 2
        const userId = faculty === null || faculty === void 0 ? void 0 : faculty.user;
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return faculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        return err;
    }
});
exports.FacultyServices = {
    getAllFaculty,
    getSingleFaculty,
    updatedFaculty,
    deletedFaculty,
};
