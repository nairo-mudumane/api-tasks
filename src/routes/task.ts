import { Router } from "express";
import * as controller from "../controllers/task";
import { AuthFirewall } from "../middleware";

const { Private } = new AuthFirewall();
const router = Router();

router.post("/", Private, controller.create);
router.get("/", Private, controller.getAll);
router.get("/:key", Private, controller.getById);

export { router as TasksRoutes };
