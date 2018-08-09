const express = require('express');
const router = express.Router();
const Messages = require('../modules/messages');

router.get('/', (req, res, next)=>{
    Messages.find({},(err, allMessage)=>{
        if (err) {
            res.json({success:false, errMSG:err})
        }else{
            res.json({success:true, messages:allMessage})
        }
    })
}).post('/', (req, res, next)=>{
    let username = req.body.username
    let email = req.body.email
    let message = req.body.message
    let newMessage = new Messages({
        username:username,
        email:email,
        message:message
    })
    Messages.create(newMessage, (err)=>{
        if (err) {
            res.json({success:false, errMSG:err})
        }else{
            res.json({success:true, MSG:'message are send'})
        }
    })
}).get('/:id/remove', (req, res, next)=>{
    Messages.findByIdAndRemove(req.params.id, (err)=>{
        if (err) {
            res.json({success:false, errMSG:err})
        }else{
            res.json({success:true, MSG:'removed success'})
        }
    })
})




module.exports = router