import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);

router.get("/create", UserController.getCreateForm);

router.post("/create", UserController.createUser);

export default router;