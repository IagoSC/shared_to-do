import express, { NextFunction, Request, Response } from "express";
import { TaskRouter } from "./routes/task.routes";
import { AppError } from "./utils/appError";

const app = express();
app.use(express.json());

console.log("Starting app");
app.get("/test", (_req: Request, res: Response) => {
  return res.status(200).send("Olá mundo");
});

app.use("/task", TaskRouter);

app.use((err: Error, _req: Request, res: Response) => {
  let statusCode = 500;
  if (err instanceof AppError) statusCode = err.statusCode;

  return res.status(statusCode).json({ message: err.message });
});

app.listen(8080, "localhost", () => {
  console.log("App started");
});
