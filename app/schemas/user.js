var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
	username : {
		unique : true,
		type : String
	},
	password : String,
	emali : String,
	role : {
		type : Number,
		default : 0
	},
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
});

userSchema.pre('save', function(next) {
	var user = this;

	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			return next(err);
		} else {
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) {
					return next(err);
				} else {
					user.password = hash;
					next();
				}
			});
		}
	});
});

userSchema.methods = {	
	comparePasswrod : function(_password, callback) {
		 console.log('密码 ' + this.password + '\n这个密码 ' + _password);
		bcrypt.compare(_password, this.password ,function(err, isMatch) {
			if(err) {
				return callback(err);
			} else {
				callback(null, isMatch);
			}
		});
	}
}

userSchema.statics = {
	fetch : function(callback) {
		return this.find({}).sort('meta.updateAt').exec(callback);
	},
	findById : function(ID, callback) {
		return this.findOne({_id: ID}).exec(callback);
	}
}

module.exports = userSchema;