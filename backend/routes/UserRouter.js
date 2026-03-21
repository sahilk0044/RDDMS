import express from "express";
import { getUsers } from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.get("/", getUsers);

export default UserRouter;