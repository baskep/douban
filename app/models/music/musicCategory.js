var mongoose = require('mongoose');
var musicCategorySchema = require('../../schemas/music/musicCategory');

var musicCategory = mongoose.model('musicCategory', musicCategorySchema);

module.exports = musicCategory;