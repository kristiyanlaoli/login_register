import validateRegister from "../middlewares/register.js";
import { register } from "../controllers/register.js";
import { Router } from "express";
const router = Router();

router.post("/register", validateRegister, register);

export default router;
