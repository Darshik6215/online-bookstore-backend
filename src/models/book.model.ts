import { Schema, model } from "mongoose";
import { Book } from "./types/book.types";

const bookSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String },
    description: { type: String },
    category: { type: [String], required: true },
    price: { type: Number, required: true },
    coverImage: { type: String },
    publisher: { type: String },
    publicationDate: { type: Date, default: Date.now },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default model<Book>("book", bookSchema);
