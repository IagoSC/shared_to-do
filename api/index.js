"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_routes_1 = require("./routes/task.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("Starting app");
app.get("/test", (_req, res) => {
    return res.status(200).send("Olá mundo");
});
app.use("/task", task_routes_1.TaskRouter);
app.listen(8080, "localhost", () => {
    console.log("App started");
});
