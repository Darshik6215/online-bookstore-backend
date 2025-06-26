import { Schema, model } from "mongoose";
import { Admin, Role } from "./types/admin.types";

const adminSchema = new Schema<Admin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Admin>("admin", adminSchema);
