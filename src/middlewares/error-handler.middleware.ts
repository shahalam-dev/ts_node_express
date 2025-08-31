import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("💥 Global Error:", err);

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(errorResponse(err.message));
  }

  res.status(500).json(
    errorResponse(
      "Internal Server Error",
      err instanceof Error ? err.message : "Unknown error"
    )
  );
}