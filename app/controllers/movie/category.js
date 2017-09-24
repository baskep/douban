var category = require('../../models/movie/category');
var underscore = require('underscore');

// 后台录入电影分类
exports.addMovieCate = function(req, res) { 
    res.render('movie/category', {
        title : '后台录入电影分类',
        category : {} 
        }
    );
}

// 保存电影分类
exports.saveCategory = function(req, res) {
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _catetory = null;

    if (id !== 'undefined' && id !== '' && id !== undefined) { // 已经存在的分类
        console.log('id :' + id);
        category.findById(id, function (err, category) {
        if (err) {
            console.log(err);
            }
            _catetory = underscore.extend(category, categoryObj); // 用新对象里的字段替换老的字段
            _catetory.save(function (err, category) {
            if (err) {
                console.log(err);
                }
            res.redirect('/addMovieCate');
            });
        });

    } else {  // 新加的列表
        _catetory = new category(categoryObj);
        _catetory.save(function (err, category) {
        if (err) {
            console.log(err);
            } 
        res.redirect('/addMovieCate');
        });
    }
}

/*// 后台分类列表
exports.categorylist = function(req, res) {
    category.fetch(function(err, categorys) {
        if(err) {
            console.log(err);
        } else {
            res.render('movie/categorylist', {
            title: '分类列表',
            categorys: categorys
            });
        }
    });
}
*/

// 获取当前分类下的数据
exports.getDataOfCategory = function(req, res) {
    var categoryName = req.query.categoryName;
    console.log(categoryName);
    category
        .find({'name': categoryName})
        .populate({
            path: 'movies',
            options: {limit :24}})
        .exec(function(err, categories) {
            if(err) {
                console.log(err);
            } else {
                res.json({
                    movies: categories[0].movies,
                    count: categories[0].movies.length
                });
            }
        });
}

// 获取当前分类下的数据并按相应的条件排序
exports.getDataOfCategoryOrder = function(req, res) {
    var options = {},
        categoryName = req.query.categoryName,
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

    category
        .find({'name': categoryName})
        .populate({
            path: 'movies',
            options: options
        })
        .exec(function(err, categories) {
            if(err) {
                console.log(err);
            } else {
                res.json({
                    movies: categories[0].movies,
                    count: categories[0].movies.length
                });
            }
        });
}