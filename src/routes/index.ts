import { Express } from "express";
import { AuthRoutes } from "./auth";

export default function ServerRoutes(app: Express) {
  app.use("/accounts/auth", AuthRoutes);
}
