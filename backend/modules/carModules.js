const mongoose = require("mongoose");

const carDetailsTemplate = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("mytable", carDetailsTemplate);
