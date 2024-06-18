import { z } from "zod";
import { UserStatus } from "./user.constant";

const userStatusSchema = z.object({
  body: z.object({
    status: z.enum(UserStatus as [string]),
  }),
});

export const UserValidation = {
  userStatusSchema,
};
