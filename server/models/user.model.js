const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
 
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  
  
},{timestamps:true});

const users = mongoose.model("users",userSchema)

module.exports=users;
