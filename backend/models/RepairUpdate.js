import mongoose from "mongoose";

const repairUpdateSchema = new mongoose.Schema({

reportId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Report",
required:true
},

engineerName:{
type:String,
required:true
},

status:{
type:String,
required:true
},

repairPhoto:{
type:String
},

updatedAt:{
type:Date,
default:Date.now
}

});

export default mongoose.model("RepairUpdate",repairUpdateSchema);