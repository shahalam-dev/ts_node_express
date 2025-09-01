import pino from "pino";
import {config} from "../config/config";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDir = path.resolve(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Valid levels for reference: fatal, error, warn, info, debug, trace, silent
const level = config.LOG_LEVEL;
const validLevels = ["fatal","error","warn","info","debug","trace","silent"];
const safeLevel = validLevels.includes(level ?? "")
  ? (level as string)
  : "info";


export const logger = pino({
  level: safeLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino/file",
        level: "info",
        options: { destination: path.join(logDir, "combined.log") },
      },
      {
        target: "pino/file",
        level: "error",
        options: { destination: path.join(logDir, "error.log") },
      },
    ],
  },
});