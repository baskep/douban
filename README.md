# 简介
本项目是基于Node.js + MongoDB的一个仿豆瓣电影网站，此项目可作为Node.js的入门练手项目。

## 项目整体架构介绍

### 1.项目前端搭建
1.使用`jQuery`和`Bootsrap`完成网站前端JS脚本和样式处理; <br>
2.前后端的数据请求交互通过`Ajax`完成;

### 2.项目后端搭建:
   1.使用`NodeJs`的`express`框架完成电影网站后端搭建; <br> 
>>2.使用`mongodb`完成数据存储,通过`mongoose`模块完成对mongodb数据的构建; <br>
>>3.使用`jade`(目前已更名为`pug`，此项目使用的老版本的jade)模板引擎完成页面创建渲染; <br>
>>4.使用`Moment.js`格式化电影存储时间;

## 项目环境搭建

### 1.安装Node.js环境
>>1.可进入Node.js官网 https://nodejs.org/en/ 下载对应版本的Node.js，下载完成后根据相应提示直接安装 <br>
   
### 2.安装MongoDB环境
>>1.进入MongoDB下载中心 https://www.mongodb.com/download-center ，下载对应版本的MongoDB安装 <br>
>>2.推荐一个MongoDB 图形化管理工具 MongoChef https://studio3t.com/download <br>
>>3.可以将项目目录下的database目录下的JSON文件使用MongoChef 作为MongoDB数据导入MongoDB 

## 项目运行

### 1.clone或download
>>1.安装git后，可使用git clone https://github.com/zt14362/MovieWebSite.git 直接检出项目到本地仓库 <br>
>>2.也可以直接在页面点击download项目到指定目录

### 2.安装对应的node_module
>>1.检出项目后，命令行进入项目根目录，使用命令npm install 即可安装项目所需的module <br>
>>2.若速度较慢，也可以将npm换成淘宝的npm镜像 https://npm.taobao.org/ , 替换npm镜像后，可使用cnpm install 达到相同的效果
 
### 3.启动服务
>>1.进入项目根目录下，使用命令npm app.js 启动整个项目 <br>
>>2.本项目使用了`grunt`构建工具，所以正确安装node_module后，也可以使用命令grunt启动项目
   
### 4.浏览器访问路径

#### >>1.1前台页面
>>1.1.`http://localhost:3000/getLoginPage` 进入登录页面 <br>
>>1.2.`http://localhost:3000/getRegistePage` 进入注册页面 <br>
>>1.3.`http://localhost:3000/` 进入网站的首页 <br>
>>1.4.`http://localhost:3000/getMoreMovie` 进入网站的 '选电影' 页面，也可以在首页右边 `最新上映`右边 点击 `更多>>` 进入此页面 <br>
>>1.5.`http://localhost:3000/searchMovie?search_text=` 进入网站的 '搜索结果' 页面，此时条件为空，所以没有数据展示，可在搜索框输入搜索条件后点击搜索进入此页面
   
   
   
