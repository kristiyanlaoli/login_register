import loginRoute from "./routes/loginRoute.js";
import registerRoute from "./routes/registerRoute.js";
import { Router } from "express";
const router = Router();

router.use("/api", loginRoute);
router.use("/api", registerRoute);

export default router;
