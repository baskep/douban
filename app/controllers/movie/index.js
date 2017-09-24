var movie = require('../../models/movie/movie');
var category = require('../../models/movie/category');

// 首页数据初始化
exports.index = function(req, res) {
    movie.find({}).skip(0).limit(8).sort({'pv' : -1})
        .exec(function(err, movies) { // 查询'正在热映'数据,按访问量降序排序
            if(err) {
                console.log(err);
            } else {
                var result = movies;

                movie.find({}).skip(0).limit(10).sort({'meta.createAt' : -1})
                    .exec(function(err, movies) { // 查询'最新上映'数据,按创建时间降序排序
                        if(err) {
                            console.log(err);
                        } else {

                            category.find({})
                                .exec(function(err, categories) { // 查询'电影分类'数据
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        res.render('movie/index', {
                                            title: '豆瓣电影',
                                            movies: result,
                                            slideCount: Math.ceil(result.length/4),
                                            latestMovies: movies,
                                            categories, categories
                                        });
                                    }
                            });
                        }
                });
            }
    });
}

