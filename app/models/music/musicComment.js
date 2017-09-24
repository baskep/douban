var mongoose = require('mongoose');
var musicCommentSchema = require('../../schemas/music/musicComment'); 

var musicComment = mongoose.model('musicComment', musicCommentSchema);

module.exports = musicComment;