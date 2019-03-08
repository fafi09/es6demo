var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by Administrator on 2019/3/2.
 */
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "is runing";
    };
    return Person;
}());
// var p=new Person('����');
//alert(p.run())
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.run = function () {
        return this.name + "is runing-sub";
    };
    Web.prototype.work = function () {
        alert(this.name + "is working");
    };
    return Web;
}(Person));
var w = new Web('lisi');
alert(w.run());
w.work();
alert(w.run());
