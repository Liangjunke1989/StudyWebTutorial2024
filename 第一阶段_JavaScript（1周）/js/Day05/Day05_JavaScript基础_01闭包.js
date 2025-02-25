window.onload = function () {
    console.log("--------------------01、闭包------------------------------")
    {
        //闭包：
        // 函数嵌套函数，内层函数可以访问外层函数的变量，并且可以修改外层函数的变量。
        console.log("-----------------------01、测试一-------------------------------")
        //01、这个不是闭包
        // function outer2() {
        //     var a = 1;
        //     function inner2() {
        //         a++;
        //         console.log(a);
        //     }
        //     inner2();
        // }
        //测试一：
        // outer2();//2
        // outer2();//2
        // outer2();//2
        console.log("-----------------------02、测试二-------------------------------")
        //02、这个是闭包
        function outer() {
            var a = 1;
            function inner() {
                a++;
                console.log(a);
            }
            return inner;
        }
        //测试二：
        outer()(); //inner(); //2
        outer()(); //inner(); //2

        const inner = outer();
        inner();//2
        inner();//3
        //总结：
        //inner对象动态储存了a的值，所以每次调用outer()都会返回一个不同值。
        //inner就是闭包。
        //闭包形成的条件：
            //1、函数嵌套函数
            //2、内层函数可以访问外层函数的变量
            //3、内层函数可以修改外层函数的变量
        console.log("-----------------------03、测试三-------------------------------")
        const inner1 = outer();
        const inner2 = outer();
        //测试三：
        inner1();//2
        inner1();//3
        inner1();//4
        inner2();//2
        console.log("-----------------------04、引申-------------------------------")
        {
            //闭包：
            // 函数嵌套函数，内层函数可以访问外层函数的变量，并且可以修改外层函数的变量。
            //闭包形成的条件：
            //1、函数嵌套函数
            //2、内层函数可以访问外层函数的变量
            //3、内层函数可以修改外层函数的变量
            //闭包形成的条件：
            //1、函数嵌套函数
            //2、内层函数可以访问外层函数的变量
            //3、内层函数可以修改外层函数的变量
            function data() {
                var a=0;
                return function () {
                    a++;
                    console.log(a);
                    name="XiaoLiang";
                }
            }
            var x=data();
            x();//1
            x();//2
            console.log(name);
            var y=data();
            y();//1
            console.log(y.name);//“”
            console.log("-----------------------05、引申-------------------------------")
            function f1() {
                let name = "LJK";
                return {
                    getName:function () {
                        return name;
                    },
                    setName:function (newName) {
                        name=newName;
                    }
                }
            }
            var fun1=f1();
            fun1.setName("XiaoLiang");
            console.log(fun1.getName());//XiaoLiang
            var fun2=f1();
            console.log(fun2.getName());//LJK 
        }

    }
}
