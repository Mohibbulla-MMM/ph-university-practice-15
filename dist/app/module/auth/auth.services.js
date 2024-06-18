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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // cheking if user is exist
    // const isUserExiste = await User.findOne({ id });
    const isUserExiste = yield user_model_1.User.isUserExisteByCustomIdMethod(id);
    // console.log({ isUserExiste });
    if (!isUserExiste) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    const isUserDeleted = isUserExiste === null || isUserExiste === void 0 ? void 0 : isUserExiste.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
    }
    const userStatus = isUserExiste === null || isUserExiste === void 0 ? void 0 : isUserExiste.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
    }
    const isPasswordMatch = yield user_model_1.User.isUserPasswordMatchMethod(payload === null || payload === void 0 ? void 0 : payload.password, isUserExiste === null || isUserExiste === void 0 ? void 0 : isUserExiste.password);
    console.log(isPasswordMatch);
    // console.log(payload);
    return { isUserDeleted, userStatus, isPasswordMatch };
});
exports.AuthServices = {
    loginUser,
};
