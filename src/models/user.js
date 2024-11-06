const mongoose = require('mongoose'); 
const bcrypt= require('bcrypt'); 

const userSchema= new mongoose.Schema({ 
    username :{type:String,required:true,unique:true}, 
    email: {type:String , required:true, email:true},
    password: {type:String, required:true},
    role:{type :String, enum: ['admin','member'], default:'member'},
}) ; 

userSchema.pre('save', async function(next){ 
    if (this.isModified('password')) { 
        const salt =await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password,salt); 
    } 
    next(); 
})   ; 
userSchema.methods.matchPassword = async function(password) { 
    return await bcrypt.compare(password, this.password);
}; 
module.exports = mongoose.model('User',userSchema); 
