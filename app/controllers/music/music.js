var music = require('../../models/music/music'); 
var musicCategory = require('../../models/music/musicCategory'); 
var musicComment = require('../../models/music/musicComment'); 
var underscore = require('underscore');

// 音乐详情
exports.detail = function(req, res) {
    var id = req.params.id;
    music.findById(id, function(err, music) {
        if(err) {
            console.log(err);
        } else {
            musicComment
                .find({music: id})
                .populate('from', 'username')
                .populate('reply.from', 'username')
                .populate('reply.to', 'username')
                .exec(function(err, musicComments) {
                    res.render('music/musicDetail', {
                        title: '音乐详情',
                        music: music,
                        musicComments: musicComments
                });
            });
        }
    });
}

// 获取音乐详情页各个星级的人数数据
exports.getMuicEvaluation = function(req, res) {
    var id = req.query.id;
    music.findById(id, function(err, music) {
        res.json({
            music: music
        });
    });
}

// 后台音乐列表
exports.musiclist = function(req, res) {
    var currentPage = req.query.currentPage;
    var musicname =  req.query.musicname;
    var author = req.query.author;
    var country = req.query.country;

    var potions = {}; // 查询条件

    if(musicname !== undefined && musicname !== '') {
        musicname = new RegExp(musicname + '.*', 'i');
        potions.title = musicname;
    }
    if(author !== undefined && author !== '') {
        author = new RegExp(author + '.*', 'i');
        potions.author = author;
    }
    if(country !== undefined && country !== '') {
        country = new RegExp(country + '.*', 'i');
        potions.country = country;
    }
    if(currentPage === undefined || currentPage === '') {
        currentPage = 1;
    } 
    currentPage = parseInt(currentPage) - 1;
    
    var offset = currentPage * 10;
    music.find(potions).skip(offset).limit(10)
        .exec(function(err, musics) {
            if(err) {
                console.log(err);
            } else {
                music.find(potions)
                    .exec(function(err, result) {
                        res.render('music/musiclist', {
                            title: '音乐列表',
                            musics: musics,
                            count: result.length,
                            currentPage: currentPage + 1
                        });
                    });
            }
        });
}

// 更新电影页
exports.updateMusic = function(req, res) { 
    var id = req.params.id;
    if (id) {
        music.findById(id, function (err, music) {
        if(err) {
            console.log(err);
        } else {

            musicCategory.find({}, function(err, musicCategories) {
            if(err) {
                console.log(err);
            } else {
                res.render('music/musicAdmin', {
                    title: '后台更新音乐',
                    music: music,
                    musicCategories: musicCategories
              });
            }
          });
        }
    });
  }
}

// 后台录入音乐
exports.addMusicPage = function(req, res) { 
    musicCategory.find({}, function(err, musicCategories) {
        if(err) {
            console.log(err);
        } else {
            res.render('music/musicAdmin', {
                title : '后台录入音乐',
                music : {},
                musicCategories : musicCategories
            });
        }
    });
}

// 提交音乐录入或更新
exports.save = function(req, res) {
    var id = req.body.music._id;
    var musicObj = req.body.music;
    var _music = null;
    if (id !== 'undefined' && id !== undefined) { // 已经存在的音乐数据
        console.log('sada :' + id);
        music.findById(id, function (err, music) {
            if (err) {
                console.log(err);
            }
            _music = underscore.extend(music, musicObj); // 用新对象里的字段替换老的字段
            _music.save(function (err, music) {
            if (err) {
                console.log(err);
                }
            res.redirect('/addMusicPage');
            });
        });
    } else { 
        _music = new music(musicObj);
        var musicCategoryId = musicObj.musicCategory;
        _music.save(function (err, music) {  // 新加的音乐
            if (err) {
                console.log(err);
            } else {
                musicCategory.findById({_id : musicCategoryId}, function(err, musicCategory) {
                if(err) {
                    console.log(err);
                } else {
                    musicCategory.musics.push(music._id); 
                    musicCategory.save(function(err, musicCategory) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.redirect('/addMusicPage');
                    }
                });           
              }
            });
          }
      });
  }
}

// 搜索音乐页面
exports.searchMusic = function(req, res) {
    var musicName = req.query.search_text;
    if(musicName === undefined || musicName === 'undefined' || musicName === '') {
        res.render('music/musicSearch', {
                title: ''
            });
    } else {
        music.find({'title': new RegExp(musicName + '.*', 'i')})
            .exec(function(err, musics) {
                if(err) {
                    console.log(err);
                } else {
                    res.render('music/musicSearch', {
                        title:  musicName + ' - ' + '搜索结果',
                        musics: musics
                    });
                }
            });
    }
}

// 删除音乐
exports.deleteMusic = function(req, res) {
    var id = req.query.id;
    if (id) {
        music.remove({_id: id}, function (err, music) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                flag : true
            });
        }
      });
    } else {
        res.json({
            flag : false
        });
    }
}

// 搜索音乐
exports.getMusic = function(req, res) {
    var musicName = req.query.search_text;
    var index = req.query.index;
    var skip = 0;
    if(musicName === undefined || musicName === 'undefined' || musicName === '') {
        res.json({
            musics: null
        });
    } else {
        if(index === undefined || index === 'undefined') {
            skip = 0 * 3;
        } else {
            skip = parseInt(index) * 3;
        }
        music.find({'title': new RegExp(musicName + '.*', 'i')}).skip(skip).limit(3)
            .exec(function(err, musics) {
                if(err) {
                    console.log(err);
                } else {
                    music.find({'title': new RegExp(musicName + '.*', 'i')})
                        .exec(function(err, result) {
                            if(err) {
                                console.log(err);
                            } else {
                                res.json({
                                    musics: musics,
                                    count: result.length
                                });
                            }
                        });
                }
            });
    }
}

// 点击更多音乐
exports.getMoreMusic = function(req, res) {
    musicCategory
        .find({})
        .exec(function(err, musicCategories) {
            if(err) {
                console.log(err);
            } else {
                res.render('music/moreMusic', {
                    title: '选音乐',
                    musicCategories, musicCategories
              });
            }
    });
}

// 评价音乐
exports.evaluateMusic = function(req, res) {
    var evaluationCount = req.query.count;
    var id = req.query.musicID;
    var option = {};
    if(evaluationCount !== undefined && evaluationCount !== '') {
        var stars = 'stars' + evaluationCount;
        switch(stars)
        {
            case 'stars5':
                option = { 'stars5' : 1};
                break;
            case 'stars4':
                option = { 'stars4' : 1};
                break;
            case 'stars3':
                option = { 'stars3' : 1};
                break;
            case 'stars2':
                option = { 'stars2' : 1};
                break;
            case 'stars1':
                option = { 'stars1' : 1};
                break;
        }
        music.findByIdAndUpdate({_id: id}, {$inc:{pv: 1}}).exec();
        music.findByIdAndUpdate({_id: id}, {$inc:option}).exec();
    }
}