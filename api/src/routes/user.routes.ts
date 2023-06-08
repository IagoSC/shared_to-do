import { Router } from "express";
import { UserController } from "../controllers/User.controller";

export const UserRouter = Router();

UserRouter.post("/", UserController.create);
