var express = require('express'); // Express框架
var static = require('express-static'); // 静态资源的访问
var bodyParser = require('body-parser'); // HTTP请求体解析中间件
var path = require('path'); // 处理文件路径
var cookieParser = require('cookie-parser'); // 解析cookie
var session = require('express-session');  // 处理session
var morgan = require('morgan'); // 记录日志
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose'); // MongoDB连接件
var mongoStore = require('connect-mongo')(session); // 将session 存入MongoDB

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/douban',{useMongoClient:true});

app.locals.moment = require('moment'); // 时间格式化模块
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: 'movie', //secret的值建议使用随机字符串
    cookie: {maxAge: 600 * 1000 * 30}, // 过期时间（毫秒）
    store : new mongoStore({
      url : 'mongodb://127.0.0.1:27017/douban',
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
