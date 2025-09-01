import express from "express";
import cors from "cors";
import morgan from "morgan";
// import pinoHttp from "pino-http";
// import { logger } from "./utils/logger.js";
import { successResponse } from "./utils/response";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler, ApiError } from "./middlewares/error-handler.middleware";
import v1Routes from "./routes/v1";

const app = express();

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
// app.use(pinoHttp({ logger }));

/* ---------------- Routes ---------------- */
app.get("/", (_req, res) => {
  res.json(successResponse({ version: "1.0.0" }, "Welcome to API"));
});

app.use("/api/v1", v1Routes);

app.get("/fail", (_req, _res, next) => {
  next(new ApiError(400, "Bad Request Example"));
});

/* ---------------- 404 + Error Handlers ---------------- */
app.use(notFoundHandler);
app.use(errorHandler);

export default app;