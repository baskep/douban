var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/movie',{useMongoClient:true});

app.locals.moment = require('moment');
app.set('views', './app/views/pages/movie');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: 'movie', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
    store : new mongoStore({
      url : 'mongodb://127.0.0.1:27017/movie',
      collection : 'session'
    })
}));

app.use(express.static(path.join(__dirname, 'resources')));
app.listen(port);

if ('development' === app.get('env')) {
   var logger = require('morgan');
   app.set('showStackErro', true);
   app.use(logger(':method :url :status'));
   app.locals.pretty = true;
   mongoose.set('debug',true);
}

require('./config/route')(app);

console.log(`server running at localhost: ${port}`);
