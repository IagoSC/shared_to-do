import { Router, Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

type Task = {
  uuid: string;
  title: string;
  description?: string;
  colaborators: string[];
};

const db: Task[] = [
  {
    uuid: "0",
    title: "inital task",
    description: "just to have a first glance of the work",
    colaborators: ["iago"],
  },
];

function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json(db);
  } catch (err) {
    next(err);
  }
}

function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { task } = req.body;
    db.push(task);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

function updateTask(req: Request, res: Response, next: NextFunction) {
  const { taskId } = req.params;
  const {
    task: { title, description },
  } = req.body;

  try {
    let task = db.find((task) => task.uuid === taskId);
    if (!task) {
      throw new AppError("taskId not found", 401);
    }
    task = { ...task, title, description };
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export { getAll, createTask, updateTask };
