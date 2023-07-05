import { z as zod } from "zod";
import { DEFAULT_ERROR_MESSAGES } from "../constants";
import { INewTask } from "../@types";

const nameErrors = {
  required_error: "o nome é obrigatório",
  invalid_type_error:
    "o nome deve ser um texto e conter pelo menos 3 caracteres",
};

const categoryErrors = {
  required_error: "a categoria é obrigatória",
  invalid_type_error:
    "a categoria deve ser um texto e conter pelo menos 3 caracteres",
};

const descriptionErrors = {
  invalid_type_error:
    "a descrição deve ser um texto e conter pelo menos 3 caracteres",
};

const dateErrors = {
  invalid_type_error: "o formato de data não é suportado",
};

function create(data: INewTask): void {
  try {
    const schema = zod.object({
      name: zod.string(nameErrors).min(3, nameErrors.invalid_type_error),
      category: zod
        .string(categoryErrors)
        .min(3, categoryErrors.invalid_type_error),
      completeAt: zod
        .string(dateErrors)
        .datetime({ message: dateErrors.invalid_type_error })
        .nullish(),
      description: zod
        .string(descriptionErrors)
        .min(3, descriptionErrors.invalid_type_error)
        .nullish(),
    });

    schema.parse(data);
  } catch (error) {
    const { issues } = error as zod.ZodError;
    const { path, code, message } = issues[0];
    const errorMessage = `[${path}]_(${code.toUpperCase()}): ${message}`;

    throw new Error(errorMessage);
  }
}

export default { create };
