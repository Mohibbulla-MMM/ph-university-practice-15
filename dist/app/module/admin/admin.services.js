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
exports.AdminServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const admin_model_1 = require("./admin.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder/QueryBuilder"));
const admin_constant_1 = require("./admin.constant");
// get all admin
const getAllAdmin = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(query);
        const admin = new QueryBuilder_1.default(admin_model_1.Admin.find(), query)
            .search(admin_constant_1.searchField)
            .filter()
            .patginate()
            .sort()
            .fields();
        const result = yield admin.modelQuery;
        const findAdmin = result === null || result === void 0 ? void 0 : result.length;
        return { findAdmin, result };
    }
    catch (err) {
        // console.log(err);
        return err;
    }
});
// get singgle admin by _id
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_model_1.Admin.findById(id).populate("user");
        return result;
    }
    catch (err) {
        return err;
    }
});
// update singgle admin by _id
const updatedAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = payload, remainingData = __rest(payload, ["name"]);
        const modifiedUpdatedData = remainingData;
        if (name && Object.keys(name).length) {
            for (const [key, value] of Object.entries(name)) {
                modifiedUpdatedData[`name.${key}`] = value;
            }
        }
        const result = yield admin_model_1.Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
            new: true,
            runValidators: true,
        }).populate("user");
        return result;
    }
    catch (err) {
        return err;
    }
});
// deleted singgle admin by _id
const deletedAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // admin update and session 1
        const admin = yield admin_model_1.Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session }).populate("user");
        if (!admin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete admin");
        }
        // user update and session 2
        const userId = admin === null || admin === void 0 ? void 0 : admin.user;
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return admin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        return err;
    }
});
exports.AdminServices = {
    getAllAdmin,
    getSingleAdmin,
    updatedAdmin,
    deletedAdmin,
};
