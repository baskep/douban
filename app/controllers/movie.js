var movie = require('../models/movie'); 
var category = require('../models/category'); 
var comment = require('../models/comment'); 
var underscore = require('underscore');

// 电影详情
exports.detail = function(req, res) {
    var id = req.params.id;
    movie.findByIdAndUpdate({_id: id}, {$inc:{pv: 1}}).exec();

    movie.findById(id, function(err, movie) {
        comment
            .find({movie: id})
            .populate('from', 'username')
            .populate('reply.from', 'username')
            .populate('reply.to', 'username')
            .exec(function(err, comments) {
                res.render('detail', {
                    title: '电影详情',
                    movie: movie,
                    comments: comments
            });
        });
    });
}

// 后台电影列表
exports.movielist = function(req, res) {
    movie.fetch(function(err, movies) {
        if(err) {
            console.log(err);
        } else {
            res.render('movielist', {
                title: '电影列表',
                movies: movies
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
                res.render('admin', {
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
            res.render('admin', {
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
                res.render('search', {
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
                res.render('moreMovie', {
                    title: '选电影',
                    categories, categories
              });
            }
    });
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