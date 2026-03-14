import express from "express";
import multer from "multer";

import {
addRepairUpdate,
getRepairUpdates
} from "../controllers/RepairController.js";

import {protect} from "../middleware/authMiddleware.js";

const RepairRouter = express.Router();

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage});

RepairRouter.post(
"/repairUpdate",
protect,
upload.single("repairPhoto"),
addRepairUpdate
);

RepairRouter.get(
"/repairUpdates/:reportId",
getRepairUpdates
);

export default RepairRouter;