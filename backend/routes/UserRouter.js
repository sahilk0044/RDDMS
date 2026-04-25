import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/UserController.js";
import upload from "../middleware/upload.js";


const UserRouter = express.Router();


UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/profile", protect, getUserProfile);
UserRouter.put(
  "/profile",
  protect,
  upload.single("profileImage"), // 👈 IMPORTANT
  updateUserProfile
);

export default UserRouter;