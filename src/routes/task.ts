import { Router } from "express";
import * as controller from "../controllers/task";
import { AuthFirewall } from "../middleware";

const { Private } = new AuthFirewall();
const router = Router();

router.post("/", Private, controller.create);
router.get("/", Private, controller.getAll);
router.delete("/", Private, controller.deleteByKey);
router.get("/:key", Private, controller.getByKey);
router.patch("/:key", Private, controller.updateByKey);
router.put("/:key/status", Private, controller.markAsDone);

export { router as TasksRoutes };
