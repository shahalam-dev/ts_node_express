import { Request, Response } from "express";
import { errorResponse } from "../utils/response";

export function notFoundHandler(req: Request, res: Response) {
  res
    .status(404)
    .json(errorResponse("Route not found", `Path: ${req.originalUrl}, Method: ${req.method}`));
}
