var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var movieSchema = new mongoose.Schema({
	doctor : String,
	title : String,
	language : String,
	country : String,
	summary : String,
	flash : String,
	poster : String,
	year: Number,    										// 上映时间
	aka: String,		 									// 又名
	casts: String,		 									// 主演
	genres: String,											// 类型
	score : String,											// 豆瓣评分
	starScore : String,										// 豆瓣星级
	stars5: Number,											// 五星人数
	stars4: Number,											// 四星人数
	stars3: Number,											// 三星人数
	stars2: Number,											// 二星人数
	stars1: Number,											// 一星人数
	pv:{													// 访问量
		type:Number,
		default:0
	},
	category: {
	    type: ObjectId,
	    ref: 'category'
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

movieSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

movieSchema.statics = {
	fetch : function(callback) {
		return this.find({}).sort('meta.updateAt').exec(callback);
	},
	findById : function(ID, callback) {
		return this.findOne({_id: ID}).exec(callback);
	}
}

module.exports = movieSchema;