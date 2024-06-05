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
};
