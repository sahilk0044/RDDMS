import express from "express";
import {register,login, adminLogin} from "../controllers/AuthController.js"

const AuthRouter = express.Router();

AuthRouter.post("/register",register);
AuthRouter.post("/login",login);
AuthRouter.post("/admin-login",adminLogin);

export default AuthRouter;