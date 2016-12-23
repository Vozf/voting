'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    time:Number,
    userId: String,
   poll: {
      name: String,
      answers:[String],
      answered:[Number]
   }
});

module.exports = mongoose.model('Poll',Poll);
