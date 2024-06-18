"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/login", 
// auth(),
(0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controllers_1.AuthControllers.loginUser);
// change password
router.post("/change-password", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controllers_1.AuthControllers.changePassword);
// refresh token
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controllers_1.AuthControllers.refreshToken);
// forget password
router.post("/forget-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controllers_1.AuthControllers.forgetPassword);
// reset passwrod
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controllers_1.AuthControllers.resetPassword);
exports.AuthRouters = router;
