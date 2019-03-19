/**
 * Created by Administrator on 2019/3/18.
 */
const fs = require("fs");

/*
//检测是文件还是目录
fs.stat('commonjs02.js',function(err,stats) {
    if(err) {
        console.log(err);
    } else {
        console.log('file:${stats.isFile()}'); //不能显示变量的值
        console.log('directory:'+stats.isDirectory());
    }

});


//fs.mkdir创建目录
fs.mkdir('logs',function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('创建成功目录');
    }

});

//创建写入文件
fs.writeFile('logs/hello.log', '您好 ~ \n', function(error){
    if(error) {
        console.log(error)
    } else {
        console.log('成功写入文件')
    }
});

//追加写入文件
fs.appendFile('logs/hello.log', 'hello ~ \n', function(error){
    if(error) {
        console.log(error)
    } else {
        console.log('成功写入文件')
    }
});

//读取文件
fs.readFile('logs/hello.log', 'utf8', function(error, data){
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
});

//读取目录
fs.readdir('logs', function(error, files){
    if (error) {
        console.log(error)
    } else {
        console.log(files)
    }
});

//重新命名
fs.rename('logs/hello.log', 'logs/greeting.log', function(error){
    if (error) {
        console.log(error)
    } else {
        console.log('重命名成功')
    }
});
*/
//删除文件
/*
fs.unlink('logs/greeting.log',function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log('成功的删除了文件: greeting.log');
    }
});*/

//删除目录
fs.rmdir('logs', function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log('成功的删除了目录：logs')
    }
});