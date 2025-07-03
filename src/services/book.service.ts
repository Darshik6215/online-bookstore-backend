import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import { COMMON_MESSAGE } from "../utils/messages.enum";

export const createBookService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      author,
      isbn,
      description,
      category,
      price,
      publisher,
      publicationDate,
      stock,
    } = req.body;

    if (!title || !author || !category || !price) {
      return res.status(400).json(COMMON_MESSAGE.All_Fields);
    }

    const coverImage = req.file ? req.file.path : undefined;

    const categoryArray = Array.isArray(category)
      ? category
      : category.includes(",")
      ? category.split(",").map((c: string) => c.trim())
      : [category];

    const newBook = await Book.create({
      title,
      author,
      isbn,
      description,
      category: categoryArray,
      price,
      coverImage,
      publisher,
      publicationDate,
      stock: stock || 0,
    });

    res.status(201).json({
      message: COMMON_MESSAGE.Success,
      data: newBook,
    });
  } catch (error: any) {
    res.status(500).json({
      message: COMMON_MESSAGE.ServerError,
      error: error.message,
    });
  }
};

export const allBookService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, filter = {} } = req.body;

    const query: any = {};

    if (filter.category) {
      query.category = filter.category;
    }

    if (filter.minPrice || filter.maxPrice) {
      query.price = {};
      if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
      if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
    }

    const pageNumber = parseInt(page.toString());
    const pageSize = parseInt(limit.toString());
    const skip = (pageNumber - 1) * pageSize;

    const books = await Book.find(query).skip(skip).limit(pageSize);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      message: COMMON_MESSAGE.Success,
      totalBooks: total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: COMMON_MESSAGE.ServerError,
      error: error.message,
    });
  }
};
