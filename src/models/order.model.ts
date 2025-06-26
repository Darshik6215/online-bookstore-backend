import { Schema, model, Types } from "mongoose";
import {
  CartPaymentMethod,
  CartPaymentStatus,
  OrderStatus,
} from "./types/order.types";

const orderItemSchema = new Schema({
  bookId: { type: Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const shippingAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: OrderStatus.PENDING,
      required: true,
    },
    shippingAddress: { type: shippingAddressSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: CartPaymentStatus.PENDING,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "cod"],
      default: CartPaymentMethod.COD,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("order", orderSchema);
