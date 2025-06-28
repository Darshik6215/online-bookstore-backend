import { Schema, model, Document } from "mongoose";
import { Role } from "./types/role.types";

export interface IRole extends Document {
  name: Role;
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Object.values(Role),
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRole>("role", roleSchema);
