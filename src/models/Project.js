const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const projectSchema = new Schema({ 
name : { 
    type: String, 
    required: true, 

} , 
description : { 
    type : String,  
    required: true,
}, 
createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
}, 
createdAt: { 
    type : Date, 
    default: Date.now,
}

}); 
module.exports= mongoose.model('Project',projectSchema); 