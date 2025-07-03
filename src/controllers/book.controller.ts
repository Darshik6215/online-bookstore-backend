import { NextFunction, Request, Response } from "express";
import { allBookService, createBookService } from "../services/book.service";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createBookService(req, res, next);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export const allBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await allBookService(req, res, next);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
