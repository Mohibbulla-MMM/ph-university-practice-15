import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      maxlength: 20,
    },
    password: {
      type: String,
      maxlength: 20,
      select: 0,
      // required: true,
    },
    email: {
      type: String,
      maxlength: 30,
      unique: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "faculty", "admin"],
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
      },
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// passwod hash
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
// password deleted before send
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// chaking user existe
userSchema.statics.isUserExisteByCustomIdMethod = async function (id: string) {
  const result = await User.findOne({ id }).select("+password");
  return result;
};

// chaking user existe
userSchema.statics.passwordHashMethod = async function (password: string) {
  const salt = Number(config?.bcrypt_salt_round);
  const result = await bcrypt.hash(password, salt);
  return result;
};

// chaking user password
userSchema.statics.isUserPasswordMatchMethod = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  const result = await bcrypt.compare(plainTextPassword, hashedPassword);
  return result;
};

// chaking user token time stamp method
userSchema.statics.isJWTIssuedBeforePasswordChangeMethod = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  // console.log({ passwordChangeTimestamp }, { jwtIssuedTimestamp });
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;

  // console.log();
  const result = passwordChangeTime > jwtIssuedTimestamp;
  // console.log({ result });
  return result;
};

export const User = model<TUser, UserModel>("User", userSchema);
