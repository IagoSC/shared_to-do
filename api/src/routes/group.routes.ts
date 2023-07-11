import { Router } from "express";
import { GroupController } from "../controllers/Group.controller";

export const GroupRouter = Router();

GroupRouter.post("/", GroupController.create);
GroupRouter.patch("/:groupId", GroupController.update);
GroupRouter.delete("/:groupId", GroupController.delete);
GroupRouter.get("/", GroupController.getMyGroups);
