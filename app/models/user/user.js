var mongoose = require('mongoose');
var userSchema = require('../../schemas/user/user'); 

var user = mongoose.model('user', userSchema);

module.exports = user;