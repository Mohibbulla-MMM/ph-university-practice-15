import donenv from "dotenv";
import path from "path";
const dotenvFilePath = path.join(process.cwd(), ".env");
// console.log(dotenvFilePath);
donenv.config({ path: dotenvFilePath });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refress_secret: process.env.JWT_REFRESS_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refress_expire_in: process.env.JWT_REFRESS_EXPIRE_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
};
