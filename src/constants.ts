const noDataProvided = "No required data provided";

const invalidEmail =
  "E-mail inválido. o e-mail deve seguir o seguinte formato: exemplo@email.com";

const invalidPassword =
  "formato de senha inválido. A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial";

const userAlreadyRegistered =
  "dados já sendo usados. Encontramos um usuário com esses dados, tente recuperar a senha.";

const validPasswordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const unknownOriginOrUser = "não autorizado: usuário ou origem desconhecidos";

const invalidOrExpiredToken =
  "não autorizado: origem desconhecida ou estrutura de token inválida ou expirada";

const notFound = "não encontrado";

export const DEFAULT_ERROR_MESSAGES = {
  noDataProvided,
  invalidEmail,
  invalidPassword,
  userAlreadyRegistered,
  unknownOriginOrUser,
  invalidOrExpiredToken,
  notFound,
};

export const SERVER_CONSTANTS = { validPasswordRegex };
