window.onload = function () {
    console.log("--------------------bind的使用------------------------------")
    {
        let n = 100;
        let obj = {
            n: 1,
            render: function () {
                this.n += 1;
                console.log(this.n);
            }
        };
        obj.render.call(obj);
        obj.render.apply(obj);
        obj.render.bind(obj)();
    }
    //setInterval(obj.render.bind(obj),2000);
    console.log("--------------------01、高频面试题一------------------------------")
    {
        var length=100;
        function f1(){
            console.log(this.length);
        }
        var obj={
            length:10,
            f2:function (f1) {
                f1();   //没有调用者    this.length=windows.length
                arguments[0]();// f=f1()  arguments[0]=f
                               // arguments[0]即f,f为数组，调用者即数组，调用者即arguments，arguments.length=2
                               // this.length=arguments.length
            }
        };
        obj.f2(f1,1,2);//0/100,3  阿里经典面试题
    }
    console.log("--------------------02、高频面试题二------------------------------")
    {
        var a=10;
        function test() {
            console.log(a);
            a=100;
            console.log(this.a)//undefined? 缺少上下文导致this.a=undefined （严格模式下）
            var a;
            console.log(a);
        }
        test(); //undefined/undefined/100
        //解题思路
        //1、预解析
        // var a;
        //2、逐行解析
        // console.log(a);
        // a=100;
        // console.log(this.a)  //undefined?  this.a全局对象没有a属性
        // console.log(a);
        //3、函数执行
    }
    console.log("--------------------03、高频面试题三------------------------------")
    {
        var number=1;
        var obj={
            number:2,
            showNumber:function () {
                this.number=3;
                console.log(this.number);
                (function (){
                    console.log(this.number)
                })();//自执行函数
                console.log(this.number);
            }
        };
        obj.showNumber();//3/undefined/3
    }
    console.log("--------------------04、高频面试题四------------------------------")
    {
        function f(something){
            console.log(this.a,something);
            return this.a+something;
        }
        var obj={
            a:2
        }
        var f2=function (){
            return f.apply(obj,arguments);
        }
        var b=f2(3);//2/3
        console.log(b);//5
    }
}
