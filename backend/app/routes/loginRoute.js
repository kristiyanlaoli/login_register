import { Router } from "express";
import { validateLogin } from "../middlewares/login.js";
const router = Router();
import { login } from "../controllers/login.js";

router.post("/login", validateLogin, login);

export default router;
