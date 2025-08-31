import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
  }),
});

export const getUserParamsSchema = z.object({
  params: z.object({
    id: z.preprocess(
      (val) => Number(val),
      z.number().int().positive()
    ),
  }),
});

export const queryParamsSchema = z.object({
  // search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});