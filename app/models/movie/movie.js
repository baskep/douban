var mongoose = require('mongoose');
var movieSchema = require('../../schemas/movie/movie'); 

var movie = mongoose.model('movie', movieSchema);

module.exports = movie;