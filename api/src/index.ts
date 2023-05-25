import express, { Request, Response } from "express";
import { TaskRouter } from "./routes/task.routes";

const app = express();
app.use(express.json());

console.log("Starting app");
app.get("/test", (_req: Request, res: Response) => {
  return res.status(200).send("Olá mundo");
});

app.use("/task", TaskRouter);

app.listen(8080, "localhost", () => {
  console.log("App started");
});
