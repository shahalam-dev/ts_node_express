// /middlewares/error-handler.middleware.ts
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import { logger } from "../utils/logger";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    // Log handled errors at `warn` level
    logger.warn(
      {
        reqId: (req as any).id,
        path: req.originalUrl,
        method: req.method,
        statusCode: err.statusCode,
        message: err.message,
      },
      "Handled API error",
    );

    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  // Log unexpected errors at `error` level
  logger.error(
    {
      reqId: (req as any).id,
      path: req.originalUrl,
      method: req.method,
      err: err instanceof Error ? { message: err.message, stack: err.stack } : err,
    },
    "Unhandled server error",
  );

  res
    .status(500)
    .json(
      errorResponse("Internal Server Error", err instanceof Error ? err.message : "Unknown error"),
    );
}
