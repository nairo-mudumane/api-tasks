import { Express } from "express";
import { AuthRoutes } from "./auth";
import { TasksRoutes } from "./task";

export default function ServerRoutes(app: Express) {
  app.use("/accounts/auth", AuthRoutes);
  app.use("/tasks", TasksRoutes);
}
