import Report from "../models/Report.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ user not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ❌ not admin
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only."
      });
    }

    // ❌ wrong password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // include role 🔥
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // 🔥 IMPORTANT (frontend uses this)
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();

    const reported = await Report.countDocuments({
      status: "reported",
    });

    const inProgress = await Report.countDocuments({
      status: "in_progress",
    });

    const repaired = await Report.countDocuments({
      status: "repaired",
    });

    res.json({
      totalReports,
      reported,
      inProgress,
      repaired,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};