import { Router } from "express";
import { GroupController } from "../controllers/Group.controller";

export const GroupRouter = Router();

GroupRouter.post("/", GroupController.create);
GroupRouter.get("/", GroupController.getMyGroups);
