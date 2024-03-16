import express from "express";
import router from "./app/router.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(router);
app.get("/api", (req, res) => {
  res.json({ message: "Hello, welcome to this API" });
});

export default app;
