import { Response } from "express";
import { IAuthRequest, ISortOder, ITask, IUser } from "../../@types";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";

type IQuery = { category: string; is_done: "0" | "1" };

export async function getAll(request: IAuthRequest, response: Response) {
  let user: IUser | null = null;
  let tasks: Array<ITask> = [];

  let filters: { [key: string]: string } = {};
  const acceptedFilters = ["category", "is_done"];
  const sort = { isDone: 1, completeAt: -1, createdAt: -1 } as ISortOder;

  const reqUser = request.user;
  const query = request.query as Partial<IQuery>;

  try {
    user = await userModel.findOne(reqUser);
    if (!user) throw new Error(DEFAULT_ERROR_MESSAGES.unknownOriginOrUser);

    if (Object.keys(query).length > 0) {
      for (const key of Object.keys(query)) {
        if (!acceptedFilters.includes(key))
          throw new Error(`filtro: '${key}' não suportado`);

        // @ts-ignore
        if (key !== "is_done") filters[key] = String(decodeURI(query[key]));
        else {
          console.log("entrou no is done");
          // @ts-ignore
          if (query.is_done === "0") filters["isDone"] = false;
          // @ts-ignore
          else if (query.is_done === "1") filters["isDone"] = true;
          else
            throw new Error(
              `filtro: '${key}' tem valor não suportado. Os valores esperados são: '0' ou '1'`
            );
        }
      }
    }
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    if (Object.keys(filters).length > 0)
      tasks = await taskModel
        .find({ ...filters, createdBy: user._id })
        .sort(sort);
    else tasks = await taskModel.find({ createdBy: user._id }).sort(sort);

    return response.status(200).json({ message: "ok", data: tasks });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
