var user = require('../models/user');

// 跳转到注册界面
exports.getRegistePage = function(req, res) {
   res.render('registe', {
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
      console.log('user :' + user);
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
  res.render('login', {
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

    user.fetch(function(err, users) {
    if(err) {
      console.log(err);
    } else {
        res.render('userlist', {
        title: 'userlist page',
        users: users
       });
    }
  });
} 

// deleteUser 删除用户
exports.deleteUser = function(req, res) {
  var userId = req.query.userId;
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

// signinRequired 判断用户是否登录
exports.signinRequired = function(req, res, next) {
  var usersession = req.session.user;
  if(!usersession) {
    res.redirect('/getLoginPage');
  } else {
    next();
  }
}

// adminRequierd 判断是否有管理员权限
exports.adminRequierd = function(req, res, next) {
  var usersession = req.session.user;
  if(usersession.role !== 1 ) {
    res.redirect('/getRegistePage');
  } else {
    next();
  }
}