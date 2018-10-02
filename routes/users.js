const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

function ValidateEmail(email){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true
  }
    return false
}

// Register
router.post('/register', (req, res, next) => {
  console.log('REGISTERING!');
  console.log(req.body);
  const errors = [];
  let newUser = new User ({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });
  console.log(newUser);

  if(!ValidateEmail(newUser.email)){
    errors.push("You must enter a valid email address (example@quizit-game.com)")
  }
  if(newUser.displayName.length < 5 || newUser.displayName.length >20){
    errors.push("displayName must 5 to 20 characters long")
  }
  if(newUser.password.length < 5 || newUser.password.length >20){
    errors.push("Password must be 5 to 20 characters long")
  }
  if(newUser.email.length > 200){
    errors.push("Email must less than 200 characters long")
  }
  if (errors.length > 0){
    res.json({errors})
  }
  else{
    User.getUserByDisplayName(newUser.displayName,function(err,userInfo){
      if(userInfo){
        errors.push("displayName already registered")
        res.json({errors});
      }
      if(!userInfo){
        User.findOne({email:newUser.email},function(err,emailInfo){
          if(emailInfo){
            errors.push("Email already registered")
            res.json({errors})
          }
          if(!emailInfo){
            User.addUser(newUser, (err, user) => {
              if(err) {
                res.json({success: false, msg: 'Failed to register user', err:err});
              } else {
                res.json({success: true, msg: 'User registered'});
              }
            });
          }
        })
      }
    })
  }
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  console.log('Authenticating');
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email:email}, (err,user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, errors: ['email not found']});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: user
        })
      } else {
        return res.json({success: false, errors: ['Wrong password']});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const profile = {
    displayName: req.user.displayName,
    email: req.user.email,
    _id: req.user._id
  }
  res.json({user: profile});
});

module.exports = router;