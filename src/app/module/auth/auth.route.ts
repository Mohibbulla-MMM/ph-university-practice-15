import express from "express";
import validateRequest from "../../utils/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/login",
  // auth(),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

// change password
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

// refresh token
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

// forget password
router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

// reset passwrod
router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

export const AuthRouters = router;
