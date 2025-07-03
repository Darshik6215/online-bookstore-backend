import express from "express";
import { BOOK_ROUTE } from "../utils/route.enum";
import { allBook, createBook } from "../controllers/book.controller";
import { upload } from "../middleware/uploadBookImage.middleware";

export const bookRouter = express.Router();

bookRouter.post(BOOK_ROUTE.create, upload.single("coverImage"), createBook);
bookRouter.post(BOOK_ROUTE.all, allBook);
