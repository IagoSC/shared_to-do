import { Router, Request, Response } from "express";

export const TaskRouter = Router();

type Task = {
  uuid: string;
  title: string;
  description?: string;
};

const db: Task[] = [
  {
    uuid: "0",
    title: "inital task",
    description: "just to have a first glance of the work",
  },
];

TaskRouter.get("/", (_req: Request, res: Response) => {
  return res.status(200).json(db);
});

TaskRouter.post("/", (req: Request, res: Response) => {
  const { task } = req.body;
  db.push(task);
  return res.status(201).json(task);
});
