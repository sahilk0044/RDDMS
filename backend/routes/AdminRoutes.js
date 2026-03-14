import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/authMiddleware.js";

import {getAdminStats} from "../controllers/AdminController.js";

const AdminRouter = express.Router();

AdminRouter.get(
"/admin/stats",
protect,
authorizeRoles("admin"),
getAdminStats
);

export default AdminRouter;