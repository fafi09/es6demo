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
// var p=new Person('����');
//alert(p.run())


class Web extends Person{
    constructor(name:string){

         super(name);  /*��ʼ������Ĺ��캯��*/
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