import { z as zod } from "zod";
import { INewTask, IUpdateTask } from "../@types";
import helpers from ".";
import { DEFAULT_ERROR_MESSAGES } from "../constants";

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

const isDoneErrors = {
  required_error: "o campo 'isDone' é obrigatório",
  invalid_type_error:
    "o campo 'isDone' tem um valor não suportado. Esperado 'true' ou 'false'",
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
    helpers.mongo.throwNewZodError(error as zod.ZodError);
  }
}

function update(data: IUpdateTask): void {
  try {
    if (Object.keys(data).length === 0)
      throw new Error(DEFAULT_ERROR_MESSAGES.noDataProvided);

    const allowedFields = ["category", "completeAt", "description", "name"];

    for (const key of Object.keys(data)) {
      if (!allowedFields.includes(key))
        throw new Error(`não foi possível atualizar o campo '${key}'`);
    }
  } catch (error) {
    throw error;
  }

  try {
    const schema = zod.object({
      name: zod
        .string(nameErrors)
        .min(3, nameErrors.invalid_type_error)
        .nullish(),
      category: zod
        .string(categoryErrors)
        .min(3, categoryErrors.invalid_type_error)
        .nullish(),
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
    helpers.mongo.throwNewZodError(error as zod.ZodError);
  }
}

function markAsDone(data: Pick<IUpdateTask, "isDone">): void {
  try {
    const schema = zod.object({ isDone: zod.boolean(isDoneErrors) });

    schema.parse(data);
  } catch (error) {
    helpers.mongo.throwNewZodError(error as zod.ZodError);
  }
}

export default { create, update, markAsDone };
