import RepairUpdate from "../models/RepairUpdate.js";
import Report from "../models/Report.js";

export const addRepairUpdate = async(req,res)=>{

try{

const {reportId, engineerName, status} = req.body;

const repair = new RepairUpdate({

reportId,
engineerName,
status,
repairPhoto: req.file ? req.file.path : null

});

await repair.save();

await Report.findByIdAndUpdate(reportId,{status});

res.status(201).json(repair);

}catch(error){

res.status(500).json({message:error.message});

}

};



export const getRepairUpdates = async(req,res)=>{

try{

const updates = await RepairUpdate.find({
reportId:req.params.reportId
}).sort({updatedAt:-1});

res.json(updates);

}catch(error){

res.status(500).json({message:error.message});

}

};