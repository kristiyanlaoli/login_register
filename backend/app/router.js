import loginRouters from "./routes/loginRoute.js";
import { Router } from "express";
const router = Router();

router.use("/api", loginRouters);

export default router;
