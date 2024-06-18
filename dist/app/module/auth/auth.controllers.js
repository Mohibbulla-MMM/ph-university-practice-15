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
exports.AuthControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginUser(req.body);
    const { accessToken, refressToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refressToken, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
    });
    (0, sendRespons_1.default)(res, {
        data: { accessToken, needsPasswordChange },
        message: "login success",
    });
}));
// change passeord ---------
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user, req.body);
    const result = yield auth_services_1.AuthServices.changePassword(req.user, req.body);
    (0, sendRespons_1.default)(res, {
        data: result,
        message: "Password is updated successfully !",
    });
}));
// refresh token ---------
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_services_1.AuthServices.refreshToken(refreshToken);
    (0, sendRespons_1.default)(res, {
        data: result,
        message: "Refresh token retrive successfully !",
    });
}));
// forget password ---------
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield auth_services_1.AuthServices.forgetPassword(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        message: "Reset link is generated successfully !",
    });
}));
// forget password ---------
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization;
    const result = yield auth_services_1.AuthServices.resetPassword(req.body, token);
    (0, sendRespons_1.default)(res, {
        data: result,
        message: "Reset link is generated successfully !",
    });
}));
exports.AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
