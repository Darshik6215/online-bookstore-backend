import { Schema, Types, model } from "mongoose";
import { User } from "./types/user.types";
import { Cart } from "./types/cart.types";

const itemsSchema = new Schema({
  bookId: { type: Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, default: 1, requied: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [itemsSchema], required: true },
    totalPrice: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

export default model<Cart>("cart", cartSchema);
