import { Response } from "express";
import { IAuthRequest, ISortOder, ITask, IUser } from "../../@types";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";

type IQuery = { category: string };

export async function getAll(request: IAuthRequest, response: Response) {
  let user: IUser | null = null;
  let tasks: Array<ITask> = [];
  const acceptedFilters = ["category"];
  const sort = { completeAt: -1, createdAt: -1 } as ISortOder;
  const reqUser = request.user;
  const query = request.query as Partial<IQuery>;

  try {
    user = await userModel.findOne(reqUser);
    if (!user)
      return response
        .status(400)
        .json({ message: DEFAULT_ERROR_MESSAGES.unknownOriginOrUser });

    if (Object.keys(query).length === 0)
      tasks = await taskModel.find().sort(sort);
    else {
      let filters: { [key: string]: string } = {};

      for (const key of Object.keys(query)) {
        if (!acceptedFilters.includes(key))
          return response
            .status(400)
            .json({ message: `filter: ${key} not supported` });

        // @ts-ignore
        filters[key] = String(decodeURI(query[key]));

        tasks = await taskModel.find(filters).sort(sort);
      }
    }

    return response.status(200).json({ message: "ok", data: tasks });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
