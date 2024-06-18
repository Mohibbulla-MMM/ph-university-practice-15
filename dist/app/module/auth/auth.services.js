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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const passwordResetSendEmail_1 = require("../../utils/passwordResetSendEmail");
//   ---------------- login user  --------------
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // cheking if user is exist
    // const isUserExiste = await User.findOne({ id });
    const user = yield user_model_1.User.isUserExisteByCustomIdMethod(id);
    // console.log({user});
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    // user is deleted
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
    }
    // user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
    }
    const isPasswordMatch = yield user_model_1.User.isUserPasswordMatchMethod(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `Wrong Password !`);
    }
    // jwt payload/data
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user.role,
    };
    const accessSecretKye = config_1.default.jwt_access_secret;
    const accessExpireIn = config_1.default.jwt_access_expire_in;
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, accessSecretKye, accessExpireIn);
    const refressSecretKey = config_1.default.jwt_refress_secret;
    const refressExpireIn = config_1.default.jwt_refress_expire_in;
    const refressToken = (0, auth_utils_1.createToken)(jwtPayload, refressSecretKey, refressExpireIn);
    return {
        accessToken,
        refressToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
//   ---------------- change paswored --------------
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user, passwordData);
    const user = yield user_model_1.User.isUserExisteByCustomIdMethod(userData.userId);
    // console.log({ user });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    // user is deleted
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
    }
    // user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
    }
    const isPasswordMatch = yield user_model_1.User.isUserPasswordMatchMethod(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    // console.log({ isPasswordMatch });
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `Wrong Password ...!`);
    }
    const hashedPassword = yield user_model_1.User.passwordHashMethod(payload === null || payload === void 0 ? void 0 : payload.newPassword);
    // console.log({ hashedPassword });
    const result = yield user_model_1.User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: hashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    console.log({ result });
    return null;
});
//   ---------------- refresh Token --------------
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const refressSecretKey = config_1.default.jwt_refress_secret;
    const accessSecretKye = config_1.default.jwt_access_secret;
    const accessExpireIn = config_1.default.jwt_access_expire_in;
    const decoded = jsonwebtoken_1.default.verify(token, refressSecretKey);
    const { role, userId, iat } = decoded;
    const user = yield user_model_1.User.isUserExisteByCustomIdMethod(userId);
    // console.log({user});
    // chaking user not found
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    // user is deleted
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
    }
    // user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
    }
    // chaking user token time stamp
    const passwordChangeAt = user === null || user === void 0 ? void 0 : user.passwordChangeAt;
    if (passwordChangeAt) {
        const result = user_model_1.User.isJWTIssuedBeforePasswordChangeMethod(passwordChangeAt, iat);
        if (result) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not Authorized! V_T");
        }
    }
    // jwt payload/data
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, accessSecretKye, accessExpireIn);
    return { accessToken };
});
const forgetPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExisteByCustomIdMethod(id);
    // console.log({user});
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    // user is deleted
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
    }
    // user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
    }
    // jwt payload/data
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user.role,
    };
    const accessSecretKye = config_1.default.jwt_access_secret;
    const accessExpireIn = config_1.default.jwt_access_expire_in;
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, accessSecretKye, accessExpireIn);
    const resetUILink = `${config_1.default.reset_pass_ui_link}?id=${id}&token=${resetToken}`;
    console.log(resetUILink);
    (0, passwordResetSendEmail_1.passwordResetSendEmail)(user.email, resetUILink);
    return resetUILink;
});
// reset password
const resetPassword = (userData, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, newPassword } = userData;
        const user = yield user_model_1.User.isUserExisteByCustomIdMethod(id);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
        }
        // user is deleted
        const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isUserDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Deleted !`);
        }
        // user status
        const userStatus = user === null || user === void 0 ? void 0 : user.status;
        if (userStatus === "blocked") {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This User is Blocked !`);
        }
        const accessSecretKey = config_1.default.jwt_access_secret;
        const decoded = jsonwebtoken_1.default.verify(token, accessSecretKey);
        if (id !== decoded.userId) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, `You id not valid !`);
        }
        const hashedPassword = yield user_model_1.User.passwordHashMethod(newPassword);
        // console.log({ hashedPassword });
        const result = yield user_model_1.User.findOneAndUpdate({
            id: decoded.userId,
            role: decoded.role,
        }, {
            password: hashedPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date(),
        });
        return null;
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err);
    }
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
