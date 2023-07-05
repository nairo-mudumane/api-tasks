import { ZodError } from "zod";

/**
 * throws new error, with a formatted message
 * @param error a valid zod error object
 */
function throwNewZodError(error: ZodError): void {
  const { issues } = error;
  const { path, code, message } = issues[0];
  const errorMessage = `[${path}]_(${code.toUpperCase()}): ${message}`;

  throw new Error(errorMessage);
}

export default { throwNewZodError };
