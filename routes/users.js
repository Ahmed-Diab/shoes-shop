const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../modules/users');
const multer = require('multer');
const path = require('path');

// start path to save images & rename images
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, 'users-images/')
  },
  filename: function(req, file, cd){
      cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})// end path to save images & rename images


// start handel multer file size and use check file type fun
const upload = multer({
   storage:storage,
   limits: {fileSize: 100000000000},
   fileFilter: function(req, file, cb){
     checkFileType(file, cb);
   }
}).single('user_image') // end handel multer file size and use check file type fun

// start check file type 
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype)
  if(mimetype && extname){
    return cb(null, true);
  } else{
    cb('Error: must be image');
  }
} // end check file type 

// start lo in
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
      User.getUserByUsername(username, (err, user) => {
        if(err) {
          return res.json({success: false, errMSG: err});
        };
        if(!user) {
          return res.json({success: false, errMSG: 'User not found'});
        }
        if (!user.block) {
          User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
            return  res.json({success: false, errMSG: 'somthig wrong  plz try agean later'})
            }
            if(isMatch) {
              const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 // 1 week
              });
              res.json({
                success: true,
                token: 'JWT '+ token,
                user: {
                  _id: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  image:user.image,
                  invok:user.invok
                }// end user
              }) // end res.json
            } else {
              return res.json({success: false, errMSG: 'Wrong password'});
            }
          }); // end User.comparePassword
        }// end else
        if (user.block){
          return res.json({success: false, errMSG: 'we are sory this acouent are bloked'});
        }

      }); // end User.getUserByUsername
  }); // end log in


// start registry  
router.post('/register', (req, res, next)=>{
  upload(req, res, (err) => {
    if(err)  {
      console.log(err)
      return  res.json({success:false, errMSG: err.message});
    } else{
      let username = req.body.username;
      let password = req.body.password;
      let email    = req.body.email;
      let image    = req.file.filename;
      let newUser  = new User({
          username:username,
          password:password,
          email:email,
          image:image
      });
      User.findOne({"username":req.body.username}, (err, user)=>{
        if (err) {
          res.json({errMSG:err})
        }
        if(user){
          res.json({success: false, errMSG:'username is alredy taken'})
        }
        if(!user){
          User.addUser(newUser, (err)=>{
            if (err) {
                res.json({errMSG:err})
            }
            res.json({success: true, MSG:'now you can login'})
        })
        }
      })
      
      }
    });
  })// end register


// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

module.exports = router;
