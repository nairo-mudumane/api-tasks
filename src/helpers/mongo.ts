import { ZodError } from "zod";

function throwNewZodError(error: ZodError) {
  const { issues } = error;
  const { path, code, message } = issues[0];
  const errorMessage = `[${path}]_(${code.toUpperCase()}): ${message}`;

  throw new Error(errorMessage);
}

export default { throwNewZodError };
