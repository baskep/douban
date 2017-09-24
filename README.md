# 简介
本项目是基于Node.js + MongoDB的一个仿豆瓣电影网站，此项目可作为Node.js的入门练手项目。

## 1.项目整体架构介绍

### 1.1.项目前端搭建
>1.1.1.使用`jQuery`和`Bootsrap`完成网站前端JS脚本和样式处理 <br>
>1.1.2.前后端的数据请求交互通过`Ajax`完成

### 1.2.项目后端搭建:
>1.2.1.使用`NodeJs`的`express`框架完成电影网站后端搭建 <br> 
>1.2.2.使用`mongodb`完成数据存储,通过`mongoose`模块完成对mongodb数据的构建 <br>
>1.2.3.使用`jade`(目前已更名为`pug`，此项目使用的老版本的jade)模板引擎完成页面创建渲染 <br>
>1.2.4.使用`Moment.js`格式化电影存储时间

## 2.项目环境搭建

### 2.1.安装Node.js环境
>2.1.1.可进入Node.js官网 https://nodejs.org/en/ 下载对应版本的Node.js，下载完成后根据相应提示直接安装 <br>
   
### 2.2.安装MongoDB环境
>2.2.1.进入MongoDB下载中心 https://www.mongodb.com/download-center ，下载对应版本的MongoDB安装 <br>
>2.2.2.推荐一个MongoDB 图形化管理工具 MongoChef https://studio3t.com/download <br>
>2.2.3.可以将项目目录下的database目录下的JSON文件使用MongoChef 作为MongoDB数据导入MongoDB 

## 3.项目运行

### 3.1. clone或download
>3.1.1.安装git后，可使用 `git clone https://github.com/zt14362/MovieWebSite.git` 直接检出项目到本地仓库 <br>
>3.1.2.也可以直接在页面点击download项目到指定目录

### 3.2.安装对应的node_module
>3.2.1.检出项目后，命令行进入项目根目录，使用命令npm install 即可安装项目所需的module <br>
>3.2.2.若速度较慢，也可以将npm换成淘宝的npm镜像 https://npm.taobao.org/ , 替换npm镜像后，可使用cnpm install 达到相同的效果
 
### 3.3.启动服务
>3.3.1.进入项目根目录下，使用命令npm app.js 启动整个项目 <br>
>3.3.2.本项目使用了`grunt`构建工具，所以正确安装node_module后，也可以使用命令grunt启动项目
   
### 4.浏览器访问路径

#### 4.1.前台页面
>4.1.1.`http://localhost:3000/getLoginPage` 进入登录页面 <br>
>4.1.2.`http://localhost:3000/getRegistePage` 进入注册页面 <br>
>4.1.3.`http://localhost:3000/` 进入电影的首页 <br>
>4.1.4.`http://localhost:3000/getMoreMovie` 进入网站的 '选电影' 页面，也可以在首页右边 `最新上映`右边 点击 `更多>>` 进入此页面 <br>
>4.1.5.`http://localhost:3000/searchMovie?search_text=` 进入电影的 '搜索结果' 页面，此时条件为空，所以没有数据展示，可在搜索框输入搜索条件后点击搜索进入此页面 <br>
>4.1.6.`http://localhost:3000/musciIndex`  进入音乐的首页 <br>
>4.1.7.`http://localhost:3000/getMoreMusic` 进入网站的 '选音乐' 页面， 也可以在首页右边 `新歌榜`右边 点击 `更多` 进入此页面 <br>
>4.1.8.`http://localhost:3000/searchMusic?search_text=` 进入音乐的 '搜索结果' 页面，此时条件为空，所以没有数据展示，可在搜索框输入搜索条件后点击搜索进入此页面 <br>
>4.1.9.点击某一电影的标题或海报则进入对应电影的详情页，详情页可以播放电影和对电影进行评论以及评分 <br>
>4.1.10.点击某一音乐的标题或海报则进入对应音乐的详情页，详情页可以播放音乐和对音乐进行评论以及评分

#### 4.2.后台页面
>4.2.1.`http://localhost:3000/addMoviePage` 进入后台录入电影数据页面，录入数据时，可以传入一个豆瓣电影的ID，使用豆瓣提供的开发者服务同步数据，这样可以减少一部分工作量 <br>
>4.2.2.`http://localhost:3000/addMovieCate` 进入后台添加电影分页页面 <br>
>4.2.3.`http://localhost:3000/userlist` 进入后台用户列表页面，此列表将数据库里所有的用户数据都展示出来 <br>
>4.2.4.`http://localhost:3000/movielist` 进入后台电影列表页面，此页面将数据库里所有的电影数据都展示出来 <br>
>4.2.5.`http://localhost:3000/musiclist` 进入后台音乐列表页面，此页面将数据库里所有的音乐数据都展示出来 

> 备注: 后台页面只有管理员才能进入，本项目中，数据库表`users`字段`role` 值为1的代表管理员。而注册的新用户，`role`值默认为0，也就是普通用户

## 5.项目整体效果
   5.1.首页 <br>
   ![image](https://github.com/zt14362/MovieWebSite/raw/master/example/index.png) <br>
   5.2.详情页 <br>
   ![image](https://github.com/zt14362/MovieWebSite/raw/master/example/detail.png) <br>
   5.3.选电影页 <br>
   ![image](https://github.com/zt14362/MovieWebSite/raw/master/example/MoreMovie.png)
 
## 6.其它
目前这个项目功能有限，很不完善，后期有时间时，会进一步完善和优化
