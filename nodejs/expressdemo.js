/**
 * Created by Administrator on 2019/3/21.
 */

/**
 * 1.配置中间件的时候需要传参 var cookieParser = require('cookie-parser'); app.use(cookieParser('123456'));
 2.设置cookie的时候配置signed属性 res.cookie('userinfo','hahaha',{domain:'.ccc.com',maxAge:900000,httpOnly:true,signed:true});
 3. signedCookies调用设置的cookie console.log(req.signedCookies);
 */
var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var ejs=require('ejs');
var app = express();

//配置中间件
app.use(session({
    secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        maxAge:1000*30*60    /*过期时间*/

    },   /*secure https这样的情况才可以访问cookie*/

    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期

    rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）


}));
app.use(cookieParser());
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
    if(req.session.userinfo){  /*获取*/
       console.log('你好'+req.session.userinfo+'欢迎回来');

    }else{

        console.log('未登录');
    }
    next();
});

app.get('/',function(req, resp) {
    resp.render("news",{ "news" : ["我是小新闻啊","我也是啊","哈哈哈哈"] });
});

app.get('/login',function(req, resp) {
    console.log('login');
    console.log(req.cookies.name);
    req.session.userinfo='张三222';
    resp.render('form',{});
});

app.get("/loginOut",function(req,res){

    //req.session.cookie.maxAge=0;  /*改变cookie的过期时间*/


    //销毁
    req.session.destroy(function(err){
        console.log(err);
    })
    res.send('退出登录成功');
});

app.post('/dologin',function(req, resp) {
    console.log(req.body);
    resp.cookie("name",'zhangsan',{domain: '.example.com', path: '/admin',maxAge: 900000, httpOnly: true}); //HttpOnly
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