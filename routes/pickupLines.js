const express = require('express');
const router = express.Router();
const passport = require('passport')
const PickupLine = require('../models/pickupLine');
const decodeUser = require('../utils/library').decodeUser;
const fbConfig = require('../config/fbConfig');
const request = require('request-promise');

router.post('/new', (req,res,next)=>{
  console.log(req.body);
  // const decodedUser = decodeUser(req.body.jwt).data
  // console.log(decodedUser);
  request({url:fbConfig.getProfileURL(req.body.accessToken)}).then(fbProfile=>{
    console.log(fbProfile);
    const fbProfileParsed = JSON.parse(fbProfile);
    const tempObj = {
      userInfo:{
        fbId:fbProfileParsed.id
      },
      text:req.body.pickupLine,
      ratings:{}
    }
    PickupLine.update({text:req.body.pickupLine},tempObj,{upsert:true}).then(dbResponse=>{
      console.log(dbResponse);
      res.json({"message":"success"});
    }).catch(err=>{
      console.log(err);
    })
  })

  // const tempObj = {
  // 	userInfo:{
  // 		name:decodedUser.displayName,
  // 		_id:decodedUser._id,
  // 		email:decodedUser.email
  // 	},
  // 	text:req.body.pickupLine,
  // 	ratings:{}
  // }
  // PickupLine.create(tempObj,function(){
  // 	console.log('saved!');
  //   res.json({message:"pickup line saved!"})
  // })
})

router.get('/random', (req,res,next)=>{
  console.log('Getting random pickup line');
  PickupLine.count().exec((err,count)=>{
    console.log(count);
    var random = Math.floor(Math.random()*count);
    PickupLine.findOne().skip(random).exec((err,result)=>{
      console.log(result);
      res.json({pickupLine:result})
    })
  })
})

module.exports = router;