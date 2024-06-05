import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      maxlength: 20,
    },
    password: {
      type: String,
      maxlength: 20,

      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
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

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});




userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});


userSchema.pre("find", async function (next) {
//  console.log(this)
  next();
});

export const User = model("User", userSchema);
