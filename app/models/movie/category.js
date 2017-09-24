var mongoose = require('mongoose');
var categorySchema = require('../../schemas/movie/category');

var category = mongoose.model('category', categorySchema);

module.exports = category;