/**
 * Created by Administrator on 2019/3/19.
 */
var events = require('events');
var EventEmitter=new events.EventEmitter();
/*实例化事件对象*/
EventEmitter.on('toparent',
    function(){
        console.log('接收到了广播事件');
    }
);

setTimeout(function(){
    console.log('广播');
    EventEmitter.emit('toparent');
    /*发送广播*/
},1000);

//Nodejs回调处理异步
// 错误的写法：
function getData(){ //模拟请求数据
 var result='';
setTimeout(
    function(){
        result='这是请求到的数据'
    },200);
    return result;
}
console.log(getData());/*异步导致请求不到数据*/
//正确的处理异步：
function getData(callback){ //模拟请求数据
    var result='';
    setTimeout(
        function(){
            result='这是请求到的数据';
            callback(result);
        },200);
}
getData(
    function(data){
        console.log(data);
    }
)