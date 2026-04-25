import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

image:{
type:String,
required:true
},
locationName: {
  type: String,
},
location:{
type:String
},

latitude:{
type:Number
},

longitude:{
type:Number
},

damageType:{
type:String
},

severity:{
type:String
},

status:{
type:String,
default:"Reported"
},

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.model("Report",reportSchema);