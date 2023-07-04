import { Response } from "express";
import { IAuthRequest } from "../../@types";

export async function create(request: IAuthRequest, response: Response) {
  const payload = request.body;

  return response.json({ payload });
}
