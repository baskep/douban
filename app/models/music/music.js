var mongoose = require('mongoose');
var musiceSchema = require('../../schemas/music/music'); 

var music = mongoose.model('music', musiceSchema);

module.exports = music;