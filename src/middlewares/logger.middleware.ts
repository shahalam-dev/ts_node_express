import pinoHttp from "pino-http";
import { logger } from "../utils/logger.js";
import { randomUUID } from "crypto";

export const loggerMiddleware = pinoHttp({
  logger,
  genReqId: () => randomUUID(),
  customLogLevel: (res, err) => {
    const statusCode = (res.statusCode as number) ?? 500;
    if (statusCode >= 500 || err) return "error";
    if (statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
