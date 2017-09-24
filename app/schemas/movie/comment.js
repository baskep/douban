var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new mongoose.Schema({
	movie : {
		type : ObjectId,
		ref : 'movie'
	},
	from: {	
		type: ObjectId, 
		ref: 'user'
	},
 	reply: [
 	{
 		from: {
 			type: ObjectId,
 			 ref: 'user'
 		},
	    to: {
	    	type: ObjectId, 
	    	ref: 'user'
	    },
	    content: String
	}],
	content : String,
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

commentSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

commentSchema.statics = {
	fetch : function(callback) {
		return this.find({}).sort('meta.updateAt').exec(callback);
	},
	findById : function(ID, callback) {
		return this.findOne({_id: ID}).exec(callback);
	}
}

module.exports = commentSchema;