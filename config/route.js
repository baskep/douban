var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Category= require('../app/controllers/category');
var Comment = require('../app/controllers/comment');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.user = req.session.user;
        next();
});
  
  // 查询/分页
  // app.get('/search', Movie.search);



    // 首页
    app.get('/', Index.index);
    app.get('/index', Index.index);



    // 跳转到注册页面
    app.get('/getRegistePage', User.getRegistePage);

    // 确定注册
    app.post('/signup', User.signup);

    // 注销登录
    app.get('/logout', User.logout);

    // 跳转到登录页面
    app.get('/getLoginPage', User.getLoginPage);

    // 确定登录
    app.post('/login', User.login);

    // 用户列表
    app.get('/userlist', User.signinRequired, User.adminRequierd, User.userlist);

    // 删除用户
    app.get('/deleteUser', User.deleteUser);



    //电影详情
    app.get('/movie/:id', Movie.detail);

    // 后台录入电影页
    app.get('/addMoviePage', User.signinRequired, User.adminRequierd, Movie.addMoviePage);

    // 后台录入提交
    app.post('/savemovie', User.signinRequired, User.adminRequierd, Movie.save);

    // 搜索电影
    app.get('/searchMovie', Movie.searchMovie);

    // 更多电影
    app.get('/getMoreMovie', Movie.getMoreMovie);

    // 获取当前分类下的数据
    app.get('/getDataOfCategory', Category.getDataOfCategory);

    // 获取当前分类下的数据按相应的条件排序
    app.get('/getDataOfCategoryOrder', Category.getDataOfCategoryOrder);

    // 电影列表
    app.get('/movielist', User.signinRequired, User.adminRequierd, Movie.movielist);

    // 更改电影信息
    app.get('/updatemovie/:id', User.signinRequired, User.adminRequierd, Movie.updateMovie);

    // 删除电影
    app.get('/deleteMovie', Movie.deleteMovie);

    // 后台录入分类页
    app.get('/addMovieCate', User.signinRequired, User.adminRequierd, Category.addMovieCate);

    // 后台录入提交
    app.post('/saveCategory', User.signinRequired, User.adminRequierd, Category.saveCategory);

    // 分类列表页
    app.get('/categorylist', User.signinRequired, User.adminRequierd, Category.categorylist);



    // 提交评论
    app.post('/comment', User.signinRequired, Comment.addNewComment);
 
}