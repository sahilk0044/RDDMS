import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // 🔥 replace with env later
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📦 GET ALL USERS (Admin only recommended)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔐 hide password

    res.status(200).json({
      count: users.length,
      users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// 🔍 GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password"); // 🔐 hide password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error(error);

    // ❗ invalid ObjectId error
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Error fetching user" });
  }
};



// 🗑 DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(error);

    // Invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Error deleting user" });
  }
};