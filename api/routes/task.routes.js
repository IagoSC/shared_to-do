"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRouter = void 0;
const express_1 = require("express");
exports.TaskRouter = (0, express_1.Router)();
const db = [
    {
        uuid: "0",
        title: "inital task",
        description: "just to have a first glance of the work",
    },
];
exports.TaskRouter.get("/", (_req, res) => {
    return res.status(200).json(db);
});
exports.TaskRouter.post("/", (req, res) => {
    const { task } = req.body;
    db.push(task);
    return res.status(201).json(task);
});
