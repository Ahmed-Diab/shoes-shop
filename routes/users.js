const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../modules/users');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');
const Admin  = require('../config/admin');

// start path to save images & rename images
const storage = multer.diskStorage({

  destination: function (req, file, callback) {
      callback(null, 'public/users_images/')
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
// to varfay user
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
// Authenticate

router.get('/', (req, res, next)=>{
  User.find({}, (err, users)=>{
    if(err){

      res.json({success:false, errMSG:err.message})

    }else{
      try {
        res.json({success:true, all_users:users})
      } catch (error) {
        
      }
    }
  })
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
      User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
          return res.json({success: false, errMSG: 'User not found'});
        }
        if (user === Admin.username && user.password === Admin.password) {
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
              }// end user
            }) // end res.json
          }
        }
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
          }// end else
        }); // end User.comparePassword
      }); // end User.getUserByUsername
  }); 

// registry  
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
          res.json({success: false, MSG:'username is alredy taken'})
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
  })// end user post


// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });
module.exports = router;
