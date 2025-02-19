window.onload = function () {
    // this关键字
    // this是一个指针型变量，它动态指向当前函数的运行环境，随着函数使用场合不同，会发生变化
    var obj = {
        name: '小明',
        age: 18,
        show: function () {
            console.log(this.name + ',' + this.age);
        }
    }
    obj.show();
    console.log("--------------------JS函数类型的多样性------------------------------")
    console.log("--------------------01、普通函数------------------------------")
    {
        console.log("----普通函数，this指向window全局对象----")
        function fn1() {
            console.log(this);
        }
        fn1();

        //什么是Javascript严格模式？
        'use strict'
        console.log("----使用严格模式，this指向undefined----")
        function  fn2() {
            'use strict' //使用严格模式，this指向undefined
            console.log(this); //不实用严格模式，this指向windows全局对象
        }
        fn2();
    }

    console.log("--------------------02、内置函数------------------------------")
    {
        // function fn3() {
        //     console.log(this);
        // }
        // 延迟执行
        // setTimeout(fn3, 3000); //定时器
        // 间隔执行
        // setInterval(fn3, 2000)
    }
    console.log("--------------------03、回调函数的应用------------------------------")
    {
        //回调函数：一个函数作为参数传递给另一个函数
        function fn4(callback,value) {
            callback(value);
        }
        function fn5(value) {
            console.log(value);
        }
        fn4(fn5,"回调函数的一般使用！！");

        //匿名函数
        fn4(function (value) {
            console.log(this); //匿名函数中的this指向window全局对象
            console.log(value);
        },"回调函数中的匿名函数应用！！");
    }
    console.log("--------------------04、函数在数组中的应用------------------------------")
    {
        //这个地方this易混淆
        function fn6(){
            console.log(this);
        }
        var arr = [fn6, 2, 3, 4, {id:10}];
        console.log(arr[0]);
        arr[0](); //this指向数组，           有调用者，是数组

        var fn7 = arr[0]; //预解析使得
        console.log(fn7)  //fn6函数
        fn7();    //this指向window全局对象,   没有调用者
    }
    console.log("--------------------05、函数在对象中的应用------------------------------")
    {
        function fn8() {
            console.log(this);
        }
        var obj = {
            name: '小明',
            age: 18,
            init: fn8
        }
       obj.init();//this指向obj对象
    }



    console.log("--------------------06、this指向规则总结------------------------------")
    {
        //this指向规则：
        //判断有没有调用者：
        //1.有调用者，this指向调用者
        //2.没有调用者，this指向window全局对象

        //判断有没有调用者：
        //1.有调用者，this指向调用者
        //2.没有调用者，this指向window全局对象
        //3.严格模式，this指向undefined
        //4.匿名函数，this指向window全局对象
        //5.函数作为参数传递给另一个函数，this指向window全局对象
    }
    console.log("--------------------07、this在构造函数中的使用------------------------")
    {
        var Person1 = function Person(name, age) {
            this.name = name;
            this.age = age;
            this.id=(Math.random().toFixed(2))*100;
            this.show = function () {
                console.log(this.name + ',' + this.age);
            }
            this.displayId = function () {
                console.log("获取的ID为："+this.id);
            }
            this.action=function () {
                console.log(this);
            }
        }
        var p1 = new Person1('小明', 18);
        p1.show();
        p1.displayId();
        p1.action();
    }
   // 函数的作用域可以修改或者指定吗？
    // 不可以，函数的作用域是固定的，不能被修改
    // call apply bind改变函数的作用域
    console.log("--------------------08、call、apply、bind------------------------------")
    {
       function fn9() {
           console.log(this.name);
           console.log(this.age);
           console.log(this.id);
        }
        var item = {
            id: (Math.random().toFixed(2)) * 100,
            name: '小明',
            age: 18
        }
        fn9.call(item);//小明 18
        fn9.apply(item);//小明 18
        fn9.bind(item)();//小明 18r
    }


}
