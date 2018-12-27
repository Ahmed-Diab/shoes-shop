const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Users = require('../modules/users');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Admin =  require('../modules/admin')

// start handle functions for multer
const editStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/users-images/')
    },
    filename: function(req, file, cd){
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })// end path to save images & rename images
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
const editUpload = multer({
    storage:editStorage,
    limits: {fileSize: 100000000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('user_edit_image') // end handel multer

router.post('/login', (req, res, next) => {
  console.log(req.body);
  
    const email = req.body.email;
    const password = req.body.password;
    Admin.getAdminByEmail(email, (err, admin) => {
        if(err) {
          return res.json({success: false, errMSG: err});
        };
        if(!admin) {
          return res.json({success: false, errMSG: 'Admin not found'});
        }
        if (admin) {
          Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if(err) {
                return  res.json({success: false, errMSG: 'somthig wrong  plz try agean later'})
            }
            if(isMatch) {
                const token = jwt.sign({data: admin}, config.secret, {
                    expiresIn: 604800 // 1 week
                  });
                res.json({success: true, token: 'JWT '+ token});
                } else {
                    return res.json({success: false, errMSG: 'Wrong password'});
                }
                }); // end User.comparePassword
        }


      }); // end Admin
  }); // end admin log in post

// start admin register post
router.post('/register', (req, res, next)=>{
      let username = req.body.username;
      let password = req.body.password;
      let email    = req.body.email;
      let newAdmin  = new Admin({
          username:username,
          password:password,
          email:email,
      });
      Admin.findOne({"email":req.body.email}, (err, admin)=>{
        if (err) {
          res.json({errMSG: err})
        }
        if(admin){
          res.json({success: false, errMSG:'email is alredy taken'})
        }
        if(!admin){
          Admin.addAdmin(newAdmin, (err)=>{
            if (err) {
                res.json({errMSG:err})
            }
            res.json({success: true, MSG:'now you can login'})
        })
        }
      })
  })// end admin register post

  // start edit user

// start get all users
router.get('/users', (req, res, next)=>{
    Users.find({}, (err, allUsers)=>{
      if(err){
        res.json({success:false, errMSG:err.message})
      }else{
        res.json({success:true, all_users:allUsers})
      }
    })
  });// end get all users

  router.post('/:id/edit', (req, res, next)=>{
    editUpload(req, res, (err) => {
      if(err)  {
        console.log(err)
        return  res.json({success:false, errMSG: err.message});
      }
    Users.findOne({"username":req.body.username}, (err, user)=>{
      if (err) {
        res.json({success:false, errMSG: err.message})
      }
      if (user) {
        if(req.file){
          Users.findByIdAndUpdate(req.params.id, 
            {
              image:req.file.filename
            }, 
            (err, user)=>{
            if (err) {
              res.json({success:false, errMSG: err.message})
            }else{
              fs.unlink('./public/users-images/'+user.image, (err) => {
                if (err) throw err;
                });
                res.json({success:true, MSG: "this username is alredy taken"})
            }
          })
      }
      if(!req.file){
        Users.findById(req.params.id, (err, user)=>{
          if (err) {
            res.json({success:false, errMSG: err.message})
          }else{
              res.json({success:true, MSG: "this username is alredy taken"})
          }
        })
    }
    }
      if (!user) {
        if(req.file){
          Users.findByIdAndUpdate(req.params.id, 
            {
              username:req.body.username,
              image:req.file.filename
            }, 
            (err, user)=>{
            if (err) {
              res.json({success:false, errMSG: err.message})
            }else{
              fs.unlink('./public/users-images/'+user.image, (err) => {
                if (err) throw err;
                });
                  res.json({success:true, MSG:'saved'})
            }
          })
        }
        if(!req.file){
          Users.findByIdAndUpdate(req.params.id, 
            {
              username:req.body.username
            }, 
            (err, user)=>{
            if (err) {
              res.json({success:false, errMSG: err.message})
            }else{
              res.json({success:true, MSG:'saved'})
            }
          })
        }
      }
    })

  })   
})  // end edit user


// start get user by id
router.get('/:id/user', (req, res, next)=>{
    Users.findById(req.params.id, (err, user)=>{
      if(err){
        res.json({success:false, errMSG:err.message});
      }else{
          res.json({success:true, user:user});
      }
    })
  });// end get user by id

  // start remove user
router.get('/:id/remove', (req, res, next)=>{
  Users.findByIdAndRemove(req.params.id, (err, user)=>{
    if(err){
      res.json({success:false, errMSG: err.message})
    }else{
      let image = user.image
      fs.unlink('./public/users-images/'+image, (err) => {
        if (err) throw err;
      });
      res.json({success:true, MSG:'removed success'})
    }
  });
});// end remove user

// start get user by id
router.get('/:id/block', (req, res, next)=>{
  Users.findByIdAndUpdate(req.params.id, {block:true},(err, user)=>{
    if(err){
      res.json({success:false, errMSG:err.message});
    }else{
        res.json({success:true, MSG:"blocked"});
    }
  })
});// end get user by id

// start get user by id
router.get('/:id/unblock', (req, res, next)=>{
  Users.findByIdAndUpdate(req.params.id, {block:false},(err, user)=>{
    if(err){
      res.json({success:false, errMSG:err.message});
    }else{
        res.json({success:true, MSG:"unblocked"});
    }
  })
});// end get user by id

module.exports = router;
