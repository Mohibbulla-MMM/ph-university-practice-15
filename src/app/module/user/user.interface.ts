import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: "student" | "faculty" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // user find method
  isUserExisteByCustomIdMethod(id: string): Promise<TUser>;

  // user password method
  isUserPasswordMatchMethod(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  // user password hash
  passwordHashMethod(newPassword: string): Promise<string>;

  // user status method
  isUserStatusMethod(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  // user token time stamp method
  isJWTIssuedBeforePasswordChangeMethod(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
