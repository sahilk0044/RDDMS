import express from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser } from "../controllers/UserController.js";
import { protect } from "../middleware/authMiddleware.js";



const UserRouter = express.Router();


UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/", getAllUsers);

// 🔍 Get user by ID
UserRouter.get("/:id", protect, getUserById);
UserRouter.delete("/:id", deleteUser);


export default UserRouter;