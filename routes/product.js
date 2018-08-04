const express = require('express');
const router = express.Router();
const Shoes = require('../modules/product');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');


// start path to save images & rename images
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/')
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
  }).array('images') // end handel multer file size and use check file type fun

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
// end multer fun
/////////////////////////////// end handel multer multer /////////////////////////////////

// get all sharts & Tsherts
router.get('/:id/remove', (req, res, next)=>{
    Shoes.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
// to remove product images from src folder
            for (const i of product.images) {
                fs.unlink('./public/images/'+i, (err) => {
                    if (err) throw err;
                    });
                fs.unlink('./public/small-images/small_'+i, (err) => {
                    if (err) throw err;
                });
                } // end remove product images from src folder
            res.json({success:true, data:'removed success'})
        }
    })
}); // end get all sharts & Tsherts

// get all Shoes
router.get('/', (req, res, next)=>{
    Shoes.find({}, (err, Shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Shoes})
        }
    })
}) //end  get all Shoes


///////////////////////////////////////// start post data /////////////////////////////////////
// start post new shose
router.post('/', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
            res.json({success:false, errMSG: err.message});
            return
        } 
        // to make shor product images = 4 pics
        if(req.files.length === 4){
            var req_images = [];
            for (const image of req.files) {
                req_images.push(image.filename);
                im.resize({
                    srcPath:  process.cwd() + '/public/images/' + image.filename,
                    dstPath:  process.cwd() + '/public/small-images/small_'+image.filename,
                    width:80
                  }, function(err, stdout, stderr){
                    if (err) {
                        console.log('error while resizing images' + stderr);
                        throw err;
                    }else{
                        console.log('resize done')
                    }
                  });
            }                 
                var category   = req.body.category,
                    price      = parseInt(req.body.price),
                    title      = req.body.title,
                    dis        = req.body.dis,
                    size_41    = parseInt(req.body.size_41),
                    size_42    = parseInt(req.body.size_42),
                    size_43    = parseInt(req.body.size_43);
                    size_44    = parseInt(req.body.size_44),
                    size_45    = parseInt(req.body.size_45),
                    size_46    = parseInt(req.body.size_46);
// create new schema
                var newShoes = new Shoes({
                    category:category,
                    price   :price,
                    dis     :dis,
                    title   :title,
                    size_41 :size_41,
                    size_42 :size_42,
                    size_43 :size_43,
                    size_44 :size_44,
                    size_45 :size_45,
                    size_46 :size_46,
                    images  :req_images
                })//end create new schema
// save new schema to mongose
                Shoes.create(newShoes, (err)=>{
                    if (err) {
                        res.json({success:false, errMSG: err.message});
                    }else{
                        res.json({success:true, MSG: 'saved'});
                    }
                })// end save new schema to mongose
            }else{
                res.json({success:false, errMSG: 'you must select 4 images not more not less'});
                return;
            }
            })
}) // end post new shose
///////////////////////////////////////// start post data /////////////////////////////////////
// start post new shose
router.post('/:id/edit', (req, res, next)=>{     
    upload(req, res, (err) => {
        // if req.files
        var category = req.body.category,
        price      = parseInt(req.body.price),
        title      = req.body.title,
        dis        = req.body.newdis,
        size_41    = parseInt(req.body.size_41),
        size_42    = parseInt(req.body.size_42),
        size_43    = parseInt(req.body.size_43);
        size_44    = parseInt(req.body.size_44),
        size_45    = parseInt(req.body.size_45),
        size_46    = parseInt(req.body.size_46);
        if(err)  {
            res.json({success:false, errMSG: err.message});
        }
        if(req.files.length === 4){
            var req_images = [];
            for (const image of req.files) {
                req_images.push(image.filename);
                im.resize({
                    srcPath:  process.cwd() + '/public/images/' + image.filename,
                    dstPath:  process.cwd() + '/public/small-images/small_'+image.filename,
                    width:80
                  }, function(err, stdout, stderr){
                    if (err) {
                        console.log('error while resizing images' + stderr);
                        throw err;
                    }else{
                        console.log('resize done')
                    }
                  });
            }
            Shoes.findById(req.params.id, (err, product)=>{
                if (err) {
                    res.json({success:false, errMSG:err.message})
                }else{
        // to remove product images from src folder
                    for (const i of product.images) {
                        fs.unlink('./public/images/'+i, (err) => {
                            if (err) throw err;
                            });
                        fs.unlink('./public/small-images/small_'+i, (err) => {
                            if (err) throw err;
                        });
                    } // end remove product images from src folder
                }
            })
        Shoes.findByIdAndUpdate(req.params.id, {
            category:category,
            price   :price,
            dis     :dis,
            title   :title,
            size_41 :size_41,
            size_42 :size_42,
            size_43 :size_43,
            size_44 :size_44,
            size_45 :size_45,
            size_46 :size_46,
            images  :req_images
        }, (err, product)=>{
            if (err) {
                res.json({success:false, errMSG: err.message});
            }else{
                res.json({success:true, MSG: 'saved'});
            }
        })// end save new schema to mongose
    }
    if (req.files.length === 0){
        Shoes.findByIdAndUpdate(req.params.id, {
            category:category,
            price   :price,
            dis     :dis,
            title   :title,
            size_41 :size_41,
            size_42 :size_42,
            size_43 :size_43,
            size_44 :size_44,
            size_45 :size_45,
            size_46 :size_46,
        }, (err)=>{
            if (err) {
                res.json({success:false, errMSG: err.message});
            }else{
                res.json({success:true, MSG: 'saved'});
            }
        })// end save new schema to mongose
    }else{
        res.json({success:false, errMSG: 'you must select 4 images not more not less'});
    }
    })
}) // end post new shose

// start to get param by id
router.param('id', function(req, res, next, id){
    Shoes.findById(id, function(err, docs){
        if(err) throw err;
        else
        {
          req.id = docs;
          next();
        }
      });	
  }) //end  get param by id


module.exports = router;