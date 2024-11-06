const mongoose = require('mongoose'); 


const notificationSchema= new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    type:{type:String, required:true}, 
    content:{type:String, required:true},
    projectId:{type:mongoose.Schema.Types.ObjectId, ref:'Project'}, 
    createdAt:{type:Date, default:Date.now}
}); 

module.exports=mongoose.model('Notification',notificationSchema);