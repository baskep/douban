var user = require('../../models/user/user');

// 跳转到注册界面
exports.getRegistePage = function(req, res) {
    res.render('user/registe', {
        title: '注册'
    });
}

// 注册请求
exports.signup = function(req, res) {
    var userInfo = req.body.user;
    var _user = new user(userInfo);
    user.findOne({username: userInfo.username}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log('user: ' + user);
        if(user === null || user === 'null') {
            _user.save(function(err, user) {
            if(err) {
                console.log(err) ;
            }  else {
                req.session.user = user;
                res.redirect('/index');
            }
        });
        } else {
            return res.redirect('/getLoginPage');
        }
    }
  });
}

// 跳转到登录界面
exports.getLoginPage = function(req, res) {
    res.render('user/login', {
        title: '登录'
    });
}

// 登录请求
exports.login = function(req, res) {
    var userInfo = req.body.user;
    var username = userInfo.username;
    var password = userInfo.password;

    user.findOne({username: username}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        if(user === null || user === 'null') {
            res.redirect('/getLoginPage');
        } else {
            user.comparePasswrod(password, function(err, isMatch) {
            if(err) {
                console.log(err);
            } 
            if(isMatch) {
                req.session.user = user;
                res.redirect('/index'); // 登录成功
            } else {
                res.redirect('/getLoginPage'); 
                console.log('登录失败');
            }
        });
      }
    }
  });
}

// 注销
exports.logout = function(req, res) {
    delete req.session.user;
    res.json({
      flag :true
    });
}

// 用户列表
exports.userlist = function(req, res) {
    var currentPage = req.query.currentPage;
    var username =  req.query.username;
    var potions = {}; // 查询条件

    if(username !== undefined && username !== '') {
        username = new RegExp(username + '.*', 'i');
        potions.username = username;
    }
    if(currentPage === undefined || currentPage === '') {
        currentPage = 1;
    } 
    currentPage = parseInt(currentPage) - 1;

    var offset = currentPage * 10;
    user.find(potions).skip(offset).limit(10)
        .exec(function(err, users) {
            if(err) {
                console.log(err);
            } else {
                user.find(potions)
                    .exec(function(err, result) {
                        res.render('movie/userlist', {
                            title: '电影列表',
                            users: users,
                            count: result.length,
                            currentPage: currentPage + 1
                        });
                    });
            }
        });
/*    user.fetch(function(err, users) {
    if(err) {
      console.log(err);
    } else {
        res.render('movie/userlist', {
        title: 'userlist page',
        users: users
       });
    }
  });*/
} 

// 根据用户ID获取用户信息
exports.getUserById = function(req, res) {
    var userId = req.query.userId;
    if(userId) {
        user.find({_id: userId})
            .exec(function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        user : user
                    });
                }
            });
    } 
} 

// 更新用户信息
exports.updateUser = function(req, res) {
    var userID = req.query.userID;
    var username = req.query.username;
    var emali = req.query.emali;
    var potions = {
        $set: {}
    };

    if(userID !== undefined && userID !== '') {
        potions.$set.username = username;
    }
    if(emali !== undefined && emali !== '') {
        potions.$set.emali = emali;
    }

    user.update({_id: userID}, potions, {upsert : true}, function(err) {
        if(err) {
            res.json({
                flag: false
            });
        } else {
            res.json({
                flag: true
            });
        }
    });
} 

// 删除用户
exports.deleteUser = function(req, res) {
    var userId = req.query.id;
    if (userId) {
        user.remove({_id: userId}, function (err, movie) {
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

// 判断用户是否登录
exports.signinRequired = function(req, res, next) {
    var usersession = req.session.user;
    if(!usersession) {
        res.redirect('/getLoginPage');
    } else {
        next();
    }
}

// 判断是否有管理员权限
exports.adminRequierd = function(req, res, next) {
    var usersession = req.session.user;
    if(usersession.role !== 1 ) {
        res.redirect('/getRegistePage');
    } else {
        next();
    }
}