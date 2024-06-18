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
exports.passwordResetSendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const passwordResetSendEmail = (to, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config_1.default.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "rockychain1020@gmail.com",
            pass: "febz otmh nuov aipc",
        },
    });
    const info = yield transporter.sendMail({
        from: '"PH-University"  <rockychain1020@gmail.com>',
        // sender address
        to, // list of receivers
        text: "text ----- text", // plain text body
        subject: "Password Reset Request",
        html: `
      <p>Dear ${to.split("@")[0]},</p>
      <p>You requested for a password reset. Please click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,</p>
      <p>Your Company Team</p>
    `,
    });
});
exports.passwordResetSendEmail = passwordResetSendEmail;
