/**
 * Created by Administrator on 2019/3/21.
 */
var bodyParser = require('body-parser');
var express = require('express');
var ejs=require('ejs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //form表单提交的数据
// parse application/json
app.use(bodyParser.json()); //提交的json数据的数据
app.set("view engine","ejs");
app.use(express.static('public'));

//内置中间件
app.use('/static',express.static('public'));

//应用级中间件
app.use(function(req,resp,next) {
    console.log(new Date());
    next();
});

//路由级中间件
app.get('/',function(req, resp, next) {
    console.log('1');
    next();
});

app.get('/',function(req, resp) {
    resp.render("news",{ "news" : ["我是小新闻啊","我也是啊","哈哈哈哈"] });
});

app.get('/login',function(req, resp) {
    console.log('login');
    resp.render('form',{});
});

app.post('/dologin',function(req, resp) {
    console.log(req.body);
    resp.render('index',{});
});

app.get('/search/:id',function(req, resp) {
    resp.send(req.params["id"]);
});
app.get('/news',function(req, resp) {
    resp.send(req.query);
});

//错误处理中间件
app.use(function(req,resp) {
    //resp.status(404).render('404',{});
    resp.status(404).send('这是404 表示路由没有匹配到');
});
app.listen(3000);