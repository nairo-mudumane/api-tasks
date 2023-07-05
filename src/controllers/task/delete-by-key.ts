import { Response } from "express";
import { isValidObjectId } from "mongoose";
import { IAuthRequest, ITask, IUser } from "../../@types";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";

type IPayload = Partial<{ tasks: Array<string> | string }>;

export async function deleteByKey(request: IAuthRequest, response: Response) {
  const { tasks: reqTasksKeys } = request.body as IPayload;
  const reqUser = request.user;
  let user: IUser | null = null;
  const tasksKeys: Array<string> = [];

  try {
    user = await userModel.findOne(reqUser);
    if (!user) throw new Error(DEFAULT_ERROR_MESSAGES.unknownOriginOrUser);

    if (!reqTasksKeys) throw new Error(DEFAULT_ERROR_MESSAGES.noDataProvided);

    if (Array.isArray(reqTasksKeys)) {
      let index = 1;
      for (const key of reqTasksKeys) {
        let task: ITask | null = null;

        if (isValidObjectId(key)) task = await taskModel.findById(key);
        else task = await taskModel.findOne({ name: decodeURI(key) });

        if (!task)
          throw new Error(`a tarefa na posição ${index} não foi encontrada`);
        else tasksKeys.push(String(task._id));

        index++;
      }
    } else {
      let task: ITask | null = null;

      if (isValidObjectId(reqTasksKeys))
        task = await taskModel.findById(reqTasksKeys);
      else task = await taskModel.findOne({ name: decodeURI(reqTasksKeys) });

      if (!task) throw new Error(DEFAULT_ERROR_MESSAGES.notFound);
      else tasksKeys.push(String(task._id));
    }
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    await taskModel.deleteMany({ _id: { $in: tasksKeys } });

    return response.status(200).json({ message: "ok" });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
