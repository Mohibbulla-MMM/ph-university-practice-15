"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dotenvFilePath = path_1.default.join(process.cwd(), ".env");
// console.log(dotenvFilePath);
dotenv_1.default.config({ path: dotenvFilePath });
exports.default = {
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
