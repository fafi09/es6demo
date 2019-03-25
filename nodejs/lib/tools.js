/**
 * Created by Administrator on 2019/3/18.
 */
var tools = {
    sayHello: function() {
        return 'hello NodeJs';
    },
    add: function(x, y) {
        return x+y;
    }
};

exports.sayHello = tools.sayHello;
exports.add = tools.add;