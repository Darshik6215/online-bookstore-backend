import { NextFunction, Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await registerUserService(req, res, next);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginUserService(req, res, next);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
