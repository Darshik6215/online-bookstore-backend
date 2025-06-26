import { Types } from "mongoose";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum CartPaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum CartPaymentMethod {
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  COD = "cod",
}

interface Orders {
  bookId: Types.ObjectId;
  quantity: Number;
  price: Number;
}

interface CartShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export type Cart = {
  userId: Types.ObjectId;
  items: Orders[];
  totalPrice: Number;
  status: OrderStatus;
  shippingAddress: CartShippingAddress;
  paymentStatus: CartPaymentStatus;
  paymentMethod?: CartPaymentMethod;
  orderDate: Date;
};
