import pino from "pino";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import * as rfs from "rotating-file-stream";
import { config } from "../config/config";

// Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.resolve(__dirname, "../logs");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const isDev = config.NODE_ENV !== "production";

// Setup rotating file stream for prod
const stream = rfs.createStream("app.log", {
  interval: "1d",
  path: logDir,
  maxFiles: 7,
});

export const logger = pino(
  {
    level: config.LOG_LEVEL || (isDev ? "debug" : "info"),
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  isDev
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      })
    : (stream as any), // rotating-file-stream
);
