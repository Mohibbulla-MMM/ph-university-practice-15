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
const express_1 = __importDefault(require("express"));
// import { StudentRouter } from "./app/module/student/student.router";
// import { UserRouter } from "./app/module/user/user.router";
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleWare/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleWare/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middle ware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"] }));
app.use("/api/v1/", routes_1.default);
// app.use("/api/v1/users", UserRouter);
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Promise.reject()
    res.send("PH-University server is running ");
});
app.get("/", test);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
