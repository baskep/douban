var movie = require('../../models/movie/movie'); 
var category = require('../../models/movie/category'); 
var comment = require('../../models/movie/comment'); 
var underscore = require('underscore');

// 电影详情
exports.detail = function(req, res) {
    var id = req.params.id;

    movie.findById(id, function(err, movie) {
        comment
            .find({movie: id})
            .populate('from', 'username')
            .populate('reply.from', 'username')
            .populate('reply.to', 'username')
            .exec(function(err, comments) {
              console.log('comments :' + comments);
                res.render('movie/detail', {
                    title: '电影详情',
                    movie: movie,
                    comments: comments
            });
        });
    });
}

// 获取电影详情页各个星级的人数数据
exports.getEvaluation = function(req, res) {
    var id = req.query.id;
    movie.findById(id, function(err, movie) {
        res.json({
            movie: movie
        });
    });
}

// 后台电影列表
exports.movielist = function(req, res) {
    var currentPage = req.query.currentPage;
    var moviename =  req.query.moviename;
    var casts = req.query.casts;
    var country = req.query.country;

    var potions = {}; // 查询条件

    if(moviename !== undefined && moviename !== '') {
        moviename = new RegExp(moviename + '.*', 'i');
        potions.title = moviename;
    }
    if(casts !== undefined && casts !== '') {
        casts = new RegExp(casts + '.*', 'i');
        potions.casts = casts;
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
    movie.find(potions).skip(offset).limit(10)
        .exec(function(err, movies) {
            if(err) {
                console.log(err);
            } else {
                movie.find(potions)
                    .exec(function(err, result) {
                        res.render('movie/movielist', {
                            title: '电影列表',
                            movies: movies,
                            count: result.length,
                            currentPage: currentPage + 1
                        });
                    });
            }
        });
}

// 更新电影页
exports.updateMovie = function(req, res) { 
    var id = req.params.id;
    if (id) {
        movie.findById(id, function (err, movie) {
        if(err) {
            console.log(err);
        } else {

            category.find({}, function(err, categories) {
            if(err) {
                console.log(err);
            } else {
                res.render('movie/admin', {
                    title: '后台更新电影',
                    movie: movie,
                    categories: categories
              });
            }
          });
        }
    });
  }
}

// 后台电影录入
exports.addMoviePage = function(req, res) { 
    category.find({}, function(err, categories) {
        if(err) {
            console.log(err);
        } else {
            res.render('movie/admin', {
                title : '后台录入电影',
                movie : {},
                categories : categories
            });
        }
    });
}

// 提交电影录入或更新
exports.save = function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if (id !== 'undefined' && id !== undefined) { // 已经存在的电影数据
        movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = underscore.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
                }
            res.redirect('/addMoviePage');
            });
        });
    } else { 
        _movie = new movie(movieObj);
        var categoryId = movieObj.category;
        _movie.save(function (err, movie) {  // 新加的电影
            if (err) {
                console.log(err);
            } else {
                category.findById({_id : categoryId}, function(err, category) {
                if(err) {
                    console.log(err);
                } else {
                    category.movies.push(movie._id); 
                    category.save(function(err, category) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.redirect('/addMoviePage');
                    }
                });           
              }
            });
          }
      });
  }
}

// 删除电影
exports.deleteMovie = function(req, res) {
    var id = req.query.id;
    if (id) {
        movie.remove({_id: id}, function (err, movie) {
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

// 搜索电影
exports.searchMovie = function(req, res) {
    var movieName = req.query.search_text;
    movie
        .find({'title': new RegExp(movieName + '.*', 'i')})
        .limit(3)
        .exec(function(err, movies) {
            if(err) {
                console.log(err);
            } else {
                res.render('movie/search', {
                    title: movieName + ' - ' + '搜索结果',
                    movies: movies
                });
            }
    });
}

// 更多电影
exports.getMoreMovie = function(req, res) {
    category
        .find({})
        .exec(function(err, categories) {
            if(err) {
                console.log(err);
            } else {
                res.render('movie/moreMovie', {
                    title: '选电影',
                    categories, categories
              });
            }
    });
}

// 评价电影
exports.evaluateMovie = function(req, res) {
    var evaluationCount = req.query.count;
    var id = req.query.movieID;
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
        movie.findByIdAndUpdate({_id: id}, {$inc:{pv: 1}}).exec();
        movie.findByIdAndUpdate({_id: id}, {$inc:option}).exec();
    }
}


/*// 原 查询/分页 (使用bootstrap-paginator)
exports.search = function(req, res) {
  var cid = req.query.cid;
  var q = parseInt(req.query.q);
  var currentPage = 1;
  if(q !==0 && q > 0) {
    currentPage = q;
    q = q - 1;
  }
  var count = 1;
  var index = q * count;

  var movieName = req.query.movieName;
  if(movieName === undefined || movieName === '') {
    category
      .find({_id: cid})
      .populate({
        path: 'movies',
        options: {
          skip : index,
          limit : count
        }
      })
      .exec(function(err, categories) {
        var categoryResult = categories[0] || {};
        var movieResult = categoryResult.movies || [];
        if (err) {
          console.log(err);
        } else {
            category
            .find({_id: cid})
            .populate({
              path: 'movies'
            })
            .exec(function(err, categories) {
              var resultLength = categories[0].movies.length;
              res.render('moreMovie', {
                title: 'imooc 结果列表页面',
                keyword: categoryResult.name,
                totalPage: Math.ceil(resultLength/1),
                cid: cid,
                currentPage : currentPage,
                movies: movieResult,
                movieName: ''
              });
          });
        }
      });
  }
  else {
    var movieType = req.query.movieType;
    movie
      .find({title: new RegExp(movieName + '.*', 'i')})
      .skip(index)
      .limit(count)
      .exec(function(err, movies) {
        if (err) {
          console.log(err);
        } else {
          var results = movies;
          movie
            .find({title: new RegExp(movieName + '.*', 'i')})
            .exec(function(err, movies) {
                res.render('moreMovie', {
                  title: 'imooc 结果列表页面',
                  keyword: movieType,
                  cid: cid,
                  totalPage: Math.ceil(movies.length/1),
                  currentPage : currentPage,
                  movies: results,
                  movieName: movieName
              });
            });

        }
      });
  }
}*/