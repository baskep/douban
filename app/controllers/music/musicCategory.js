var music = require('../../models/music/music');
var musicCategory= require('../../models/music/musicCategory');
var underscore = require('underscore');

// 后台录入音乐分类
exports.addMusicCate = function(req, res) { 
    res.render('music/musicCategory', {
        title : '后台录入音乐分类',
        musicCategory : {} 
        }
    );
}

// 保存音乐分类
exports.saveMusicCategory = function(req, res) {
    var musicCategoryObj = req.body.musicCategory;
    console.log(musicCategoryObj);
    var _musicCategoryObj = null;
    musicCategory
    	.find({'name': musicCategoryObj.name})
    	.exec(function(err, result) {
    		if(err) {
    			console.log(err);
    		} else {
    			_musicCategoryObj = new musicCategory(musicCategoryObj);
		        _musicCategoryObj.save(function (err, musicCategoryObj) {
		        if (err) {
		            console.log(err);
		        } 

		        res.redirect('/addMusicCate');
		        });
    		}
    	});
}

// 获取当前分类下的数据
exports.getDataOfCurrentItem = function(req, res) {
    var musicCategoryName = req.query.musicCategoryName;
    musicCategory
        .find({'name': musicCategoryName})
        .populate({
            path: 'musics',
            options: {limit :8}})
        .exec(function(err, musicCategories) {
            if(err) {
                console.log(err);
            } else {
                if(musicCategories && musicCategories.length > 0) {
                    res.json({
                        musics: musicCategories[0].musics
                    });
                }
            }
        });
}

// 获取当前分类下的数据并按相应的条件排序
exports.getMusicDataOfCategoryOrder = function(req, res) {
    var options = {},
        musicCategoryName = req.query.musicCategoryName,
        skip = req.query.skip,
        sort =  req.query.sort;
    options.limit = 8;
    switch(sort)
    {
        case 'pv':
            options.sort = { 'pv' : -1};
            break;
        case 'year':
            options.sort = { 'year' : -1};
            break;
        case 'genres':
            options.sort = { 'genres' : -1};
            break;
    }
  
    if(skip !== undefined && skip !== null) {
        options.skip = parseInt(skip);
    } else {
        options.skip = 0;
    }

    musicCategory
        .find({'name': musicCategoryName})
        .populate({
            path: 'musics',
            options: options
        })
        .exec(function(err, musicCategories) {
            if(err) {
                console.log(err);
            } else {
                res.json({
                    musics: musicCategories[0].musics,
                    count: musicCategories[0].musics.length
                });
            }
        });
}