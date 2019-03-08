/**
 * Created by Administrator on 2019/3/2.
 */
 class Person{

     name:string;

     constructor(name:string){
         this.name=name;
     }

     run():string{

         return `${this.name}is runing`
     }
 }
// var p=new Person('王五');
//alert(p.run())


class Web extends Person{
    constructor(name:string){

         super(name);  /*初始化父类的构造函数*/
     }
     run():string{

         return `${this.name}is runing-sub`
     }
     work(){

         alert(`${this.name}is working`)
     }
 }


 var w=new Web('lisi');
 alert(w.run());

 w.work();