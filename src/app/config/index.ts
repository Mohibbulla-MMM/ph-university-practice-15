import donenv from "dotenv";
import path from "path";
const dotenvFilePath = path.join(process.cwd(), ".env");
// console.log(dotenvFilePath);
donenv.config({ path: dotenvFilePath });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
