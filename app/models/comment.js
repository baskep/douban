var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment.js'); 

var comment = mongoose.model('comment', commentSchema);

module.exports = comment;