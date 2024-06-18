import jwt from "jsonwebtoken";

export const createToken = (
  payload: { userId: string; role: string },
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const tokenVerify = (token: string, secretKey: string) => {
  return jwt.verify(token, secretKey);
};
