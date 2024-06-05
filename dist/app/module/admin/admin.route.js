"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin.controllers");
const router = express_1.default.Router();
router.get("/", admin_controllers_1.AdminControllers.getAllAdmin);
router.get("/:id", admin_controllers_1.AdminControllers.getSingleAdmin);
router.patch("/:id", admin_controllers_1.AdminControllers.updatedAdmin);
router.delete("/:id", admin_controllers_1.AdminControllers.deletedAdmin);
exports.AdminRouter = router;
