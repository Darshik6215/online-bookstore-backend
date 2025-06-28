// seedRoles.ts

import { connectDB } from "../../config/db";
import RoleModel from "../../models/role.model";
import mongoose from "mongoose";
import { Role } from "../../models/types/role.types";

export const seedRoles = async () => {
  try {
    await connectDB();

    const existingRoles = await RoleModel.find({});
    if (existingRoles.length === 0) {
      const rolesToInsert = Object.values(Role).map((role) => ({
        name: role,
      }));

      await RoleModel.insertMany(rolesToInsert);
      console.log("✅ Default roles seeded successfully.");
    } else {
      console.log("ℹ️ Roles already exist. No seeding needed.");
    }
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database.");
  }
};
seedRoles();
