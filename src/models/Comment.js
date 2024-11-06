const mongoose  = require('mongoose'); 
const commentSchema= new mongoose.Schema({
 
    user: {type : mongoose.Schema.Types.ObjectIdId, ref:'User', ref:'User',required:true}, 
    project: {type : mongoose.Schema.Types.ObjectId, ref :'Project',required: true}, 
    comment: {type : String, required: true}, 
    createdAt: {type : Date, default: Date.now},



}); 

module.exports = mongoose.model('Comment',commentSchema);