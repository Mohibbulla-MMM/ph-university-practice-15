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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = config_1.default.database_url;
            yield mongoose_1.default.connect(url, {
                dbName: "ph-university",
                // useUnifiedTopology: true,
                // useNewUrlParser: true,
            });
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Student server is running on the port ${config_1.default.port} `);
            });
        }
        catch (err) {
            console.log(`server file errro :>  ${err}`);
        }
    });
}
main();
// unhandle rejection asynchronous code
process.on("unhandledRejection", () => {
    // console.log(!server);
    if (server) {
        // console.log(!server);
        server.close(() => {
            process.exit(1);
        });
    }
    console.log("⭕🐞⭕unhandledRejection is detected. server sutting down!");
    process.exit(1);
});
// uncaught exception synchronous code
process.on("uncaughtException", () => {
    console.log("⭕🐞⭕ uncaughtExeption is detected. server sutting down!");
    process.exit(1);
});
// console.log(adsf);
