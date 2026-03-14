import Report from "../models/Report.js";

export const getAdminStats = async(req,res)=>{

try{

const totalReports = await Report.countDocuments();

const pendingReports = await Report.countDocuments({
status:"Reported"
});

const resolvedReports = await Report.countDocuments({
status:"Repaired"
});

const highSeverity = await Report.countDocuments({
severity:"High"
});

res.json({
totalReports,
pendingReports,
resolvedReports,
highSeverity
});

}catch(error){

res.status(500).json({message:error.message});

}

};