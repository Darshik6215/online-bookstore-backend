export type Book = {
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  category: string[];
  price: number;
  stock: number;
  coverImage?: string;
  publisher?: string;
  publicationDate?: Date;
};
