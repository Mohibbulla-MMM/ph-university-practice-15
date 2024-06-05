import express from "express";
import { AdminControllers } from "./admin.controllers";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch("/:id", AdminControllers.updatedAdmin);

router.delete("/:id", AdminControllers.deletedAdmin);

export const AdminRouter = router;
