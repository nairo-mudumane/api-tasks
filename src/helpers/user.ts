import { z as zod } from "zod";
import { INewUser } from "../@types";
import { DEFAULT_ERROR_MESSAGES, SERVER_CONSTANTS } from "../constants";
import helpers from ".";

const nameErrors = {
  required_error: "o nome é obrigatório",
  invalid_type_error:
    "o nome deve ser um texto e conter pelo menos 3 caracteres",
};

const emailErrors = {
  required_error: "o e-mail é obrigatório",
  invalid_type_error: DEFAULT_ERROR_MESSAGES.invalidEmail,
};

const passwordErrors = {
  required_error: "a senha é obrigatória",
  invalid_type_error: DEFAULT_ERROR_MESSAGES.invalidPassword,
};

/**
 * checks provided data to create a new user
 * @param data data to check
 */
function signup(data: INewUser): void {
  try {
    const schema = zod.object(
      {
        name: zod.string(nameErrors).min(3, nameErrors.invalid_type_error),
        email: zod.string(emailErrors).email(emailErrors.invalid_type_error),
        password: zod
          .string(passwordErrors)
          .regex(
            SERVER_CONSTANTS.validPasswordRegex,
            passwordErrors.invalid_type_error
          ),
      },
      {
        required_error: DEFAULT_ERROR_MESSAGES.noDataProvided,
        invalid_type_error: DEFAULT_ERROR_MESSAGES.noDataProvided,
      }
    );

    schema.parse(data);
  } catch (error) {
    helpers.mongo.throwNewZodError(error as zod.ZodError);
  }
}

export default { signup };
