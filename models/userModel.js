  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    email: {
      type: String, 
      required: true,
      unique: true,
      max: 50, 
    },
    password: {  
      type: String,
      required: true,
      min: 8,
    },
    isAdmin:{
      type:Boolean
    },
     date: {   
    type: Date,
    default: Date.now,
  },

  });

  module.exports = mongoose.model("Users", userSchema);


