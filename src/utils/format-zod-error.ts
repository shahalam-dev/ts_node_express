import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  const errors: Record<string, string> = {};

  error.issues.forEach(issue => {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return {
    success: false,
    message: "Validation failed",
    errors,
  };
}