import { Schema, model } from "mongoose";
import { User, USER_ROLE } from "./types/user.types";

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
});

const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: [addressSchema], required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
  },
  { timestamps: true }
);

export default model<User>("user", userSchema);
