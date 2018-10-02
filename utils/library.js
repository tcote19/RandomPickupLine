const jwt = require('jsonwebtoken');
const secret = require('../config/database').secret;

const decodeUser = (userJWT)=>{
  trimmedJWT = userJWT.substring(3).trim();
  return jwt.verify(trimmedJWT,secret);
}

module.exports = {decodeUser};