const mongoose = require('mongoose');

const pickupLineSchema = mongoose.Schema({
  userInfo: {
    type: Object
  },
  text: {
    type: String,
    required: true
  },
  ratings: {
    type: Object
  }
});

const PickupLine = module.exports = mongoose.model('PickupLine', pickupLineSchema);