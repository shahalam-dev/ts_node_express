import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodError } from "../utils/format-zod-error";

export const validate = (schema: ZodType<any, any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return res.status(400).json(formatZodError(result.error));
  }

  Object.assign(req, result.data);
  next();
};