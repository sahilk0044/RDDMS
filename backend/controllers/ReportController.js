import Report from "../models/Report.js";
import { calculateDistance } from "../utils/Distance.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const reportDamage = async (req,res)=>{

try{

const {location,latitude,longitude} = req.body;

const last24Hours = new Date(Date.now() - 24*60*60*1000);

const recentReports = await Report.find({
createdAt: { $gte: last24Hours }
});

for(let report of recentReports){

const distance = calculateDistance(
latitude,
longitude,
report.latitude,
report.longitude
);

if(distance <= 20){
return res.status(400).json({
message:"Duplicate report detected within 20 meters"
});
}

}

// ---------- AI Detection ----------
let damageType = "Unknown";
let severity = "Low";

if(req.file){

const formData = new FormData();
formData.append("image", fs.createReadStream(req.file.path));

const aiResponse = await axios.post(
"http://localhost:5000/detect",
formData,
{
headers: formData.getHeaders()
}
);

const detections = aiResponse.data.detections;

if(detections && detections.length > 0){

damageType = "Pothole";

const confidence = detections[0].confidence;

if(confidence > 0.7){
severity = "High";
}else if(confidence > 0.4){
severity = "Medium";
}else{
severity = "Low";
}

}

}
// ---------- END AI Detection ----------

const report = new Report({
userId:req.user.id,
image:req.file.path,
location,
latitude,
longitude,
damageType,
severity
});

await report.save();

res.status(201).json(report);

}catch(error){

res.status(500).json({message:error.message});

}

};

export const getReports = async(req,res)=>{

const reports = await Report.find().populate("userId","name email");

res.json(reports);

};

export const getReportById = async(req,res)=>{

const report = await Report.findById(req.params.id);

res.json(report);

};

export const updateStatus = async(req,res)=>{

const {status} = req.body;

const report = await Report.findByIdAndUpdate(
req.body.reportId,
{status},
{new:true}
);

res.json(report);

};