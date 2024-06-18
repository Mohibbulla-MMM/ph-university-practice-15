import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload, decode } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../module/user/user.interface";
import { User } from "../module/user/user.model";

const auth = (...requiredRolles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization;
    const secretKye = config.jwt_access_secret as string;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized! T");
    }

    const decoded = jwt.verify(token, secretKye) as JwtPayload;
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

    // chekin user role
    if (requiredRolles && !requiredRolles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized! R");
    }

    // req.user = decoded;
    req.user = decoded as JwtPayload;
    console.log({ decoded }); // bar
    next();
  });
};

export default auth;

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
