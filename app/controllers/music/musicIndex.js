var music = require('../../models/music/music');
var musicCategory = require('../../models/music/musicCategory');

exports.musicIndex = function(req, res) {
	music.find({}).skip(0).limit(8).sort({'pv' : -1})
		.exec(function(err, musics) {
			if(err) {
				console.log(err);
			} else {
				music.find({}).skip(0).limit(10).sort({'meta.createAt' : -1})
					.exec(function(err, latestMousics) {
						if(err) {
							console.log(err);
						} else {				
							musicCategory.find({})
								.exec(function(err, musicCategories) {
								    res.render('music/musicIndex', {
								        title: '豆瓣音乐',
								        musics: musics,
								        latestMousics: latestMousics,
								        musicCategories: musicCategories
								    });
							});
						}
					});
			}
	});
}