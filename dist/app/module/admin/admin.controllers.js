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
exports.AdminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const admin_services_1 = require("./admin.services");
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getAllAdmin(req.query);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find all admin success!",
    });
}));
const getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_services_1.AdminServices.getSingleAdmin(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find a admin success!",
    });
}));
const updatedAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_services_1.AdminServices.updatedAdmin(id, req.body);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Update a admin success!",
    });
}));
const deletedAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_services_1.AdminServices.deletedAdmin(id);
    (0, sendRespons_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        message: "Find a admin success!",
    });
}));
exports.AdminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updatedAdmin,
    deletedAdmin,
};
