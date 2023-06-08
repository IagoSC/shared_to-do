import express, { NextFunction, Request, Response } from "express";
import { TaskRouter } from "./routes/task.routes";
import { AppError } from "./utils/appError";
import { config } from "./config";
import { UserRouter } from "./routes/user.routes";

const app = express();
app.use(express.json());

console.log("Starting app");
app.get("/test", (_req: Request, res: Response) => {
  return res.status(200).send("Olá mundo");
});

app.use("/task", TaskRouter);
app.use("/user", UserRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  if (err instanceof AppError) statusCode = err.statusCode;

  console.debug(err);
  return res.status(statusCode).json({ message: err.message });
});

app.listen(config.httpPort, () => {
  console.log("App started");
  console.log("Listening to port: ", config.httpPort);
});
