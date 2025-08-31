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