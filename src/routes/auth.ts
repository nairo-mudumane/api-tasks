import { Router } from "express";
import * as controller from "../controllers/users";

const router = Router();

router.post("/signup", controller.signup);

export { router as AuthRoutes };
