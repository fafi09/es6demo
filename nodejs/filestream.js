/**
 * Created by Administrator on 2019/3/19.
 */
const fs = require('fs');
var fileReadStream = fs.createReadStream('package.json');
var count=0;
var str='';
fileReadStream.on('data', function(chunk){
    console.log( ++count +' 接收到：'+ chunk.length);
    str+=chunk
})
fileReadStream.on('end', function() {
    console.log('--- 结束 ---');
    console.log(count);
    console.log(str);
})
fileReadStream.on('error', function(error) { console.log(error) })

var data = '我是从数据库获取的数据，我要保存起来';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt'); // 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');
// 标记文件末尾
writerStream.end();
// 处理流事件 --> finish 事件
writerStream.on('finish', function() {
 /*finish - 所有数据已被写入到底层系统时触发。*/
    console.log("写入完成。");
});
writerStream.on('error', function(err){ console.log(err.stack); });
console.log("程序执行完毕");
