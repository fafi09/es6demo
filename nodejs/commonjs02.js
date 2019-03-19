/**
 * Created by Administrator on 2019/3/18.
 */
var tools = require('./lib/tools.js');
console.log(tools.add(1,2));
console.log(tools.sayHello());

/**
npm i silly-datetime ¨Csave
 */
var sd = require('silly-datetime');
console.log(sd.format(new Date(), 'YYYY-MM-DD HH:mm'));
