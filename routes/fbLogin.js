const request = require('request-promise');
const express = require('express');
const router = express.Router();
const fbConfig = require("../config/fbConfig");
const FbUser = require("../models/fbUser");

router.post('/login', (req, res, next) => {
	console.log("Logging In");
	//Extracts token from the req.body with body-parser middleware
	const accessToken = req.body.accessToken;
	//URL for facebook's graph API to get long-lived token
	const fbPayload = 'https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=576501639372036&client_secret=dd6c3e5f87ece76d074b99d33e46e290&fb_exchange_token='+accessToken+'';
	//Requests facebook for a long-lived token and returns the long-lived token to the browser
	request({
		url: fbPayload
	}).then(response=>{
		const fbPayload = fbConfig.getProfileURL(accessToken);
		res.json({'res':response});
		request({
			url:fbPayload
		}).then(profileInfo=>{
			const profileParsed = JSON.parse(profileInfo);
			console.log(profileParsed);
			const fbUserProfile = {
				fbId:profileParsed.id,
				name:profileParsed.name,
				gender:profileParsed.gender,
				picture:profileParsed.picture
			}
			console.log(fbUserProfile);
			FbUser.update({fbId:profileParsed.id},fbUserProfile,{upsert: true}).then(dbResponse=>{
				console.log(dbResponse);
			}).catch(err=>{
				console.log(err);
			})
		})
	})
})

router.post('/getstuff', (req,res,next)=>{
	console.log('Getting stuff');
	//Extracts token from the req.body with body-parser middleware
	const accessToken = req.body.accessToken;
	//URL for facebook's graph API to get long-lived token
	const fbPayload = fbConfig.getProfileURL(accessToken);
	//Requests facebook for info and returns said info to browser
	request({
		url:fbPayload
	}).then(response=>{
		res.json({'profile':response});
	})
})

module.exports = router;

// https://graph.facebook.com/debug_token