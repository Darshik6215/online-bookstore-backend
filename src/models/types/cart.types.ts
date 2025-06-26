import { Types } from "mongoose";

interface Items {
  bookId: Types.ObjectId;
  quantity: Number;
  price: Number;
}

export type Cart = {
  userId: Types.ObjectId;
  items: Items[];
  totalPrice: Number;
};
