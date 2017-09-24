var Index = require('../app/controllers/movie/index');
var Movie = require('../app/controllers/movie/movie');
var Category= require('../app/controllers/movie/category');
var Comment = require('../app/controllers/movie/comment');

var User = require('../app/controllers/user/user');

var Musicindex = require('../app/controllers/music/musicIndex');
var Musiccategory = require('../app/controllers/music/musicCategory');
var Music = require('../app/controllers/music/music');
var Musiccomment = require('../app/controllers/music/musicComment');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.user = req.session.user;
        next();
});
  


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

    // 根据用户ID获取用户信息
    app.get('/getUserById', User.getUserById)

    // 更新用户信息
    app.get('/updateUser', User.updateUser)
    
    // 删除用户
    app.get('/deleteUser', User.deleteUser);



    // 电影详情
    app.get('/movie/:id', Movie.detail);

    //  获取电影详情页各个星级的人数数据
    app.get('/getEvaluation', Movie.getEvaluation);

    // 后台录入电影页
    app.get('/addMoviePage', User.signinRequired, User.adminRequierd, Movie.addMoviePage);

    // 后台录入提交
    app.post('/savemovie', User.signinRequired, User.adminRequierd, Movie.save);

    // 搜索电影
    app.get('/searchMovie', Movie.searchMovie);

    // 更多电影
    app.get('/getMoreMovie', Movie.getMoreMovie);

    // 电影列表
    app.get('/movielist', User.signinRequired, User.adminRequierd, Movie.movielist);
    
    // 更改电影信息
    app.get('/updatemovie/:id', User.signinRequired, User.adminRequierd, Movie.updateMovie);

    // 删除电影
    app.get('/deleteMovie', Movie.deleteMovie);

    // 评价电影
    app.get('/evaluateMovie', Movie.evaluateMovie);



    // 后台录入分类页
    app.get('/addMovieCate', User.signinRequired, User.adminRequierd, Category.addMovieCate);

    // 后台录入提交
    app.post('/saveCategory', User.signinRequired, User.adminRequierd, Category.saveCategory);

    // 获取当前分类下的数据
    app.get('/getDataOfCategory', Category.getDataOfCategory);

    // 获取当前分类下的数据按相应的条件排序
    app.get('/getDataOfCategoryOrder', Category.getDataOfCategoryOrder);



    // 提交评论
    app.post('/comment', User.signinRequired, Comment.addNewComment);




    // 豆瓣音乐首页
    app.get('/musciIndex', Musicindex.musicIndex);



     // 后台录入音乐分类
    app.get('/addMusicCate', User.signinRequired, User.adminRequierd, Musiccategory.addMusicCate);

    // 后台录入音乐分类提交
    app.post('/saveMusicCategory', User.signinRequired, User.adminRequierd, Musiccategory.saveMusicCategory);

    // 首页获取当前分类下的数据
    app.get('/getDataOfCurrentItem', Musiccategory.getDataOfCurrentItem);
    
    // 更多音乐页面获取当前分类下的数据按相应的条件排序
    app.get('/getMusicDataOfCategoryOrder', Musiccategory.getMusicDataOfCategoryOrder);


    
    //  音乐详情
    app.get('/music/:id', Music.detail);

    //  获取音乐详情页各个星级的人数数据
    app.get('/getMuicEvaluation', Music.getMuicEvaluation);

    // 后台录入音乐
    app.get('/addMusicPage', User.signinRequired, User.adminRequierd, Music.addMusicPage);

    // 后台录入音乐提交
    app.post('/savemusic', User.signinRequired, User.adminRequierd, Music.save);

    // 搜索音乐页面
    app.get('/searchMusic', Music.searchMusic);

    // 更多音乐页面
    app.get('/getMoreMusic', Music.getMoreMusic);
    
    // 音乐列表
    app.get('/musiclist', User.signinRequired, User.adminRequierd, Music.musiclist);
    
    // 更改音乐信息
    app.get('/updatemusic/:id', User.signinRequired, User.adminRequierd, Music.updateMusic);

    // 模糊搜索具体音乐
    app.get('/getMusic', Music.getMusic);
    
    // 删除音乐
    app.get('/deleteMusic', Music.deleteMusic);

    // 评价音乐
    app.get('/evaluateMusic', Music.evaluateMusic);


    
    // 提交评论
    app.post('/musicComment', User.signinRequired, Musiccomment.addNewComment);
}