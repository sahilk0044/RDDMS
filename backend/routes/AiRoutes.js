import express from "express";
import multer from "multer";
import {detectDamage} from "../controllers/AiController.js";

const AiRouter = express.Router();

const storage = multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"uploads/");
},
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}
});

const upload = multer({storage});

AiRouter.post(
"/detectDamage",
upload.single("image"),
detectDamage
);

export default AiRouter;