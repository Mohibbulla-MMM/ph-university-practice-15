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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../module/user/user.model");
const auth = (...requiredRolles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const secretKye = config_1.default.jwt_access_secret;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not Authorized! T");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKye);
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
        // chekin user role
        if (requiredRolles && !requiredRolles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not Authorized! R");
        }
        // req.user = decoded;
        req.user = decoded;
        console.log({ decoded }); // bar
        next();
    }));
};
exports.default = auth;
// jwt.verify(token, secretKye, function (err, decoded) {
//   if (err) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!  V");
//   }
//   const role = (decoded as JwtPayload).role;
//   if (requiredRolles && !requiredRolles.includes(role)) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized! R");
//   }
//   // req.user = decoded;
//   req.user = decoded as JwtPayload;
//   console.log({ decoded }); // bar
//   next();
// });
