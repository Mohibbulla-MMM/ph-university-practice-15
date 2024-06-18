import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { createToken } from "./auth.utils";
import { passwordResetSendEmail } from "../../utils/passwordResetSendEmail";

//   ---------------- login user  --------------
const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // cheking if user is exist
  // const isUserExiste = await User.findOne({ id });
  const user = await User.isUserExisteByCustomIdMethod(id);
  // console.log({user});

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`);
  }
  // user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Deleted !`);
  }
  // user status
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Blocked !`);
  }
  const isPasswordMatch = await User.isUserPasswordMatchMethod(
    password,
    user?.password
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, `Wrong Password !`);
  }

  // jwt payload/data
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessSecretKye = config.jwt_access_secret as string;
  const accessExpireIn = config.jwt_access_expire_in as string;

  const accessToken = createToken(jwtPayload, accessSecretKye, accessExpireIn);

  const refressSecretKey = config.jwt_refress_secret as string;
  const refressExpireIn = config.jwt_refress_expire_in as string;

  const refressToken = createToken(
    jwtPayload,
    refressSecretKey,
    refressExpireIn
  );

  return {
    accessToken,
    refressToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

//   ---------------- change paswored --------------
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // console.log(user, passwordData);
  const user = await User.isUserExisteByCustomIdMethod(userData.userId);
  // console.log({ user });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`);
  }
  // user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Deleted !`);
  }
  // user status
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Blocked !`);
  }

  const isPasswordMatch = await User.isUserPasswordMatchMethod(
    payload?.oldPassword,
    user?.password
  );

  // console.log({ isPasswordMatch });
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, `Wrong Password ...!`);
  }

  const hashedPassword = await User.passwordHashMethod(payload?.newPassword);
  // console.log({ hashedPassword });

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  console.log({ result });
  return null;
};

//   ---------------- refresh Token --------------
const refreshToken = async (token: string) => {
  const refressSecretKey = config.jwt_refress_secret as string;
  const accessSecretKye = config.jwt_access_secret as string;
  const accessExpireIn = config.jwt_access_expire_in as string;

  const decoded = jwt.verify(token, refressSecretKey) as JwtPayload;
  const { role, userId, iat } = decoded;

  const user = await User.isUserExisteByCustomIdMethod(userId);
  // console.log({user});

  // chaking user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`);
  }

  // user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Deleted !`);
  }

  // user status
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Blocked !`);
  }

  // chaking user token time stamp
  const passwordChangeAt = user?.passwordChangeAt;

  if (passwordChangeAt) {
    const result = User.isJWTIssuedBeforePasswordChangeMethod(
      passwordChangeAt,
      iat as number
    );
    if (result) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not Authorized! V_T"
      );
    }
  }
  // jwt payload/data
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };
  const accessToken = createToken(jwtPayload, accessSecretKye, accessExpireIn);

  return { accessToken };
};

const forgetPassword = async (id: string) => {
  const user = await User.isUserExisteByCustomIdMethod(id);
  // console.log({user});

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`);
  }
  // user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Deleted !`);
  }
  // user status
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `This User is Blocked !`);
  }

  // jwt payload/data
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessSecretKye = config.jwt_access_secret as string;
  const accessExpireIn = config.jwt_access_expire_in as string;

  const resetToken = createToken(jwtPayload, accessSecretKye, accessExpireIn);

  const resetUILink = `${config.reset_pass_ui_link}?id=${id}&token=${resetToken}`;
  console.log(resetUILink);
  passwordResetSendEmail(user.email, resetUILink);
  return resetUILink;
};

// reset password
const resetPassword = async (
  userData: { id: string; newPassword: string },
  token: string
) => {
  try {
    const { id, newPassword } = userData;

    const user = await User.isUserExisteByCustomIdMethod(id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, `User not found`);
    }
    // user is deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, `This User is Deleted !`);
    }
    // user status
    const userStatus = user?.status;
    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, `This User is Blocked !`);
    }
    const accessSecretKey = config.jwt_access_secret as string;
    const decoded = jwt.verify(token, accessSecretKey) as JwtPayload;

    if (id !== decoded.userId) {
      throw new AppError(httpStatus.FORBIDDEN, `You id not valid !`);
    }

    const hashedPassword = await User.passwordHashMethod(newPassword);
    // console.log({ hashedPassword });

    const result = await User.findOneAndUpdate(
      {
        id: decoded.userId,
        role: decoded.role,
      },
      {
        password: hashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
      }
    );

    return null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
