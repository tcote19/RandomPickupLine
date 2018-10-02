const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema ({
  email: {
    type: String,
    required: true,
    unique:true
  },
  displayName: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByDisplayName = function(displayName, callback) {
  const query = {displayName: displayName}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}