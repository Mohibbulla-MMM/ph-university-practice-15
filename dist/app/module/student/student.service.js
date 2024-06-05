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
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_modules_1 = require("./student.modules");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const student_constant_1 = require("./student.constant");
// find all student from db
const findAllStudent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // // fiter query
    // const filterObj = { ...query };
    // // search term
    // let searchTerm = "";
    // if (query?.searchTerm) {
    //   searchTerm = query.searchTerm as string;
    // }
    // const searchField: string[] = [
    //   "name.lastName",
    //   "name.firstName",
    //   "email",
    //   "gender",
    //   "presentAddress.country",
    // ];
    // const searchQuery = {
    //   $or: searchField.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: "i" },
    //   })),
    // };
    // // fileds query
    // let fieldsQery: string = "-__v";
    // if (query?.fields) {
    //   const fields = `${query.fields}`;
    //   fieldsQery = fields.replace(/,/g, " ");
    //   console.log({ fieldsQery });
    // }
    // const studentSerch = Student.find(searchQuery).select(fieldsQery);
    // // console.log({ filterObj });
    // const excludeQuery = [
    //   "searchTerm",
    //   "sort",
    //   "limit",
    //   "page",
    //   "skip",
    //   "fields",
    // ];
    // excludeQuery.forEach((field) => {
    //   delete filterObj[field];
    // });
    // console.log({ query }, { filterObj });
    // const filterStudent = studentSerch.find(filterObj).populate([
    //   { path: "user" },
    //   { path: "admissionSemester" },
    //   {
    //     path: "academicDepartment",
    //     populate: {
    //       path: "academicFaculty",
    //     },
    //   },
    // ]);
    // // sort -----------
    // let sort = "-createAt";
    // if (query?.sort) {
    //   sort = query.sort as string;
    // }
    // const sortStudent = filterStudent.sort(sort);
    // let limit = 1;
    // let page = 1;
    // let skip = 0;
    // if (query?.limit) {
    //   limit = Number(query?.limit);
    // }
    // if (query?.page) {
    //   page = Number(query.page);
    //   skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortStudent.skip(skip);
    // const limitStudent = await paginateQuery.limit(limit);
    // // console.log(limit);
    // const findStudent = limitStudent?.length;
    // return { findStudent, result: limitStudent };
    const studentQuery = new QueryBuilder_1.default(student_modules_1.Student.find(), query)
        .search(student_constant_1.searchField)
        .filter()
        .patginate()
        .sort()
        .fields();
    const result = yield studentQuery.modelQuery.populate("user");
    // .populate([{ path: "user" }]);
    const findStudent = result === null || result === void 0 ? void 0 : result.length;
    return { findStudent, result };
});
// single student find by id
const findSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_modules_1.Student.findById(id).populate("user");
    return result;
});
// single student deleted by id
const singleStudentDeleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const student = yield student_modules_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!student) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to deleted Student!");
        }
        const userId = student === null || student === void 0 ? void 0 : student.user;
        console.log({ userId });
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        console.log({ user });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to deleted User !");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return student;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
// student update
const singleStudentUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { name, guardiant, localGuardiant, permanentAddress, presentAddress } = payload, remaingData = __rest(payload, ["name", "guardiant", "localGuardiant", "permanentAddress", "presentAddress"]);
        const modifyUpdatedData = Object.assign({}, remaingData);
        // name  set
        if (name && Object.keys(name).length) {
            for (const [key, value] of Object.entries(name)) {
                modifyUpdatedData[`name.${key}`] = value;
            }
        }
        if (guardiant && Object.keys(guardiant).length) {
            for (const [key, value] of Object.entries(guardiant)) {
                modifyUpdatedData[`guardiant.${key}`] = value;
            }
        }
        if (localGuardiant && Object.keys(localGuardiant).length) {
            for (const [key, value] of Object.entries(localGuardiant)) {
                modifyUpdatedData[`localGuardiant.${key}`] = value;
            }
        }
        if (permanentAddress && Object.keys(permanentAddress).length) {
            for (const [key, value] of Object.entries(permanentAddress)) {
                modifyUpdatedData[`permanentAddress.${key}`] = value;
            }
        }
        if (presentAddress && Object.keys(presentAddress).length) {
            for (const [key, value] of Object.entries(presentAddress)) {
                modifyUpdatedData[`presentAddress.${key}`] = value;
            }
        }
        console.log(modifyUpdatedData);
        const result = yield student_modules_1.Student.findByIdAndUpdate(id, modifyUpdatedData, {
            new: true,
            runValidators: true,
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.StudentServices = {
    findAllStudent,
    findSingleStudent,
    singleStudentDeleted,
    singleStudentUpdate,
};
