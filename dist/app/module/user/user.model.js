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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// passwod hash
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
// password deleted before send
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "";
        next();
    });
});
// chaking user existe
userSchema.statics.isUserExisteByCustomIdMethod = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.User.findOne({ id }).select("+password");
        return result;
    });
};
// chaking user existe
userSchema.statics.passwordHashMethod = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = Number(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.bcrypt_salt_round);
        const result = yield bcrypt_1.default.hash(password, salt);
        return result;
    });
};
// chaking user password
userSchema.statics.isUserPasswordMatchMethod = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
        return result;
    });
};
// chaking user token time stamp method
userSchema.statics.isJWTIssuedBeforePasswordChangeMethod = function (passwordChangeTimestamp, jwtIssuedTimestamp) {
    console.log({ passwordChangeTimestamp }, { jwtIssuedTimestamp });
    const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
    // console.log();
    const result = passwordChangeTime > jwtIssuedTimestamp;
    // console.log({ result });
    return result;
};
exports.User = (0, mongoose_1.model)("User", userSchema);
