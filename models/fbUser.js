const mongoose = require("mongoose");

const fbUserSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  fbId: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  picture: {
  	type: Object,
  	required: false,
  }
});

const fbUser = module.exports = mongoose.model('fbUser', fbUserSchema);