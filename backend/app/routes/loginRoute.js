import { validateLogin } from "../middlewares/login.js";
import { login } from "../controllers/login.js";
import { Router } from "express";
const router = Router();

router.post("/login", validateLogin, login);
export default router;
