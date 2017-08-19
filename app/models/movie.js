var mongoose = require('mongoose');
var movieSchema = require('../schemas/movie.js'); 

var movie = mongoose.model('movie', movieSchema);

module.exports = movie;