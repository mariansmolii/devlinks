import cors from "cors";
import pino from "pino-http";
import express from "express";

import authRouter from "./routers/api/auth-router.js";
import linkRouter from "./routers/api/link-router.js";
import shareRouter from "./routers/api/share-router.js";
import profileRouter from "./routers/api/profile-router.js";

import { env } from "./utils/index.js";

const PORT = env("PORT", 3000);

const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
      options: {
        prettyPrint: {
          colorize: true,
        },
      },
    })
  );

  app.use("/api/auth", authRouter);
  app.use("/api/link", linkRouter);
  app.use("/api/share", shareRouter);
  app.use("/api/profile", profileRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use((err, req, res, _next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default startServer;
