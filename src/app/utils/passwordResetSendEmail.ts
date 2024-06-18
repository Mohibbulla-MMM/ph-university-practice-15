import nodemailer from "nodemailer";
import config from "../config";

const passwordResetSendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rockychain1020@gmail.com",
      pass: "febz otmh nuov aipc",
    },
  });

  const info = await transporter.sendMail({
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
};

export { passwordResetSendEmail };
