import express from "express";
import taskRouter from "./task.router";

const apiRouter = express();

apiRouter.use("/task", taskRouter);

export default apiRouter;
