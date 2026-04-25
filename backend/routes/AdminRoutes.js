import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/authMiddleware.js";

import {adminLogin, getAdminStats} from "../controllers/AdminController.js";

const AdminRouter = express.Router();

AdminRouter.get(
"/stats",
protect,
authorizeRoles("admin"),
getAdminStats
);
AdminRouter.post("/admin-login",adminLogin);

export default AdminRouter;