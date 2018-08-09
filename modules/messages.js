const mongoose = require('mongoose');

var newMessage = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    updated_date: { 
      type: Date, 
      default: Date.now
     }
});

const Message = module.exports = mongoose.model('Message', newMessage);
