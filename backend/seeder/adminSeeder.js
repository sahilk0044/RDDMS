import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const createAdmin = async () => {

  try {

    await mongoose.connect(process.env.MONGOURL);

    const hashedPassword = await bcrypt.hash("admin123",10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully");

    process.exit();

  } catch (error) {

    console.error(error);
    process.exit(1);

  }

};

createAdmin();