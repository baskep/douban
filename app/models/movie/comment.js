var mongoose = require('mongoose');
var commentSchema = require('../../schemas/movie/comment'); 

var comment = mongoose.model('comment', commentSchema);

module.exports = comment;