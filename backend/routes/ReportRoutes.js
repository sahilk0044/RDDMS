import express from "express";
import multer from "multer";

import {
reportDamage,
getReports,
getReportById,
updateStatus
} from "../controllers/ReportController.js"

import {protect} from "../middleware/authMiddleware.js";

const ReportRouter = express.Router();

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage});

ReportRouter.post("/reportDamage",upload.single("image"),reportDamage);

ReportRouter.get("/reports",getReports);

ReportRouter.get("/report/:id",getReportById);

ReportRouter.put("/updateStatus",protect,updateStatus);

export default ReportRouter;