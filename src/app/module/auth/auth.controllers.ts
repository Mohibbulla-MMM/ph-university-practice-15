import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendRespons from "../../utils/sendRespons";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refressToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refressToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  sendRespons(res, {
    data: { accessToken, needsPasswordChange },
    message: "login success",
  });
});

// change passeord ---------
const changePassword = catchAsync(async (req, res) => {
  // console.log(req.user, req.body);
  const result = await AuthServices.changePassword(req.user, req.body);

  sendRespons(res, {
    data: result,
    message: "Password is updated successfully !",
  });
});

// refresh token ---------
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendRespons(res, {
    data: result,
    message: "Refresh token retrive successfully !",
  });
});

// forget password ---------
const forgetPassword = catchAsync(async (req, res) => {
  const id = req?.body?.id;
  const result = await AuthServices.forgetPassword(id);

  sendRespons(res, {
    data: result,
    message: "Reset link is generated successfully !",
  });
});

// forget password ---------
const resetPassword = catchAsync(async (req, res) => {
 const token = req.headers?.authorization as string
  const result = await AuthServices.resetPassword(req.body , token);

  sendRespons(res, {
    data: result,
    message: "Reset link is generated successfully !",
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
