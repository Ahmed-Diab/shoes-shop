const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var newAdmin = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    updated_date: { 
      type: Date, 
      default: Date.now
     }
});

const Admin = module.exports = mongoose.model('Admin', newAdmin);
module.exports.getAdminById = function(id, callback) {
    Admin.findById(id, callback);
  }
  
  module.exports.getAdminByEmail = function(email, callback) {
    const query = {email: email}
    Admin.findOne(query, callback);
  }
  
  module.exports.addAdmin = function(newAdmin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if(err) throw err;
        newAdmin.password = hash;
        newAdmin.save(callback);
      });
    });
  }

  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }