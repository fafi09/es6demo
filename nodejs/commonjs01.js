/**
 * Created by Administrator on 2019/3/7.
 */
var http = require("http");
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

http.createServer(
    function(req,res) {
        console.log(req.url);
        console.log(req.data);
        console.log(req.method);
        var dataObject = "";
        var data = '';
        //1.通过判断url路径和请求方式来判断是否是表单提交
        if (req.url === '/test' && req.method === 'POST') {
            /**服务端接收post请求参数的流程
             * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
             *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
             *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
             *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
             * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
             */
            //创建空字符叠加数据片段
            data = '';

            //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
            req.on('data', function (chunk) {
                // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
                data += chunk;
                console.log('data on---');
            });

            // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
            //注册end事件，所有数据接收完成会执行一次该方法
            req.on('end', function () {

                //（1）.对url进行解码（url会对中文进行编码）
                data = decodeURI(data);
                console.log(data);

                /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

                //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
                //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
                dataObject = querystring.parse(data);
                var jsonObject = JSON.parse(data);
                console.log(dataObject);
                //解决跨域问题
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
                console.log('data:'+jsonObject.username + ":" + jsonObject.pass);
                res.end(data);
            });
        }
        if (req.url === '/test' && req.method === 'GET') {
            res.end('ok');
        }
        /**
         * 就是对于一些可能对服务器数据有影响的请求，
         * 如 PUT，DELETE 和搭配某些 MIME 类型的 POST 方法，
         * 浏览器必须先发送一个“预检请求”——也就是刚才说的 preflight response，
         * 来确认服务器是否允许该请求，允许的话再真正发送相应的请求。
         *
         * 发送的请求内容类型如果不是 application/x-www-form-urlencoded，multipart/form-data 或 text/plain 这三者的话，
         * 便会触发 OPTIONS 请求，而 jQuery 发送的请求内容类型默认值为 application/x-www-form-urlencoded，
         * 这就是 jQuery 可以顺利请求的原因。
         */
        if (req.url === '/test' && req.method === 'OPTIONS') {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            res.end("{'username':'ok','pass':'ok'}");
        }
    }
).listen(8001);