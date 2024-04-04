const mongoose = require('mongoose');

// Schema
const imagesSchema = new mongoose.Schema({
  imageUrl:  {
      type: String
    }
  
  });

const Image = mongoose.model('Image', imagesSchema);

module.exports = Image