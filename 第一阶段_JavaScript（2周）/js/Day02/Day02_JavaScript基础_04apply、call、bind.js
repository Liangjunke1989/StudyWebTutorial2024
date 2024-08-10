window.onload = function () {

    console.log("--------------------01、call、apply、bind基本使用------------------------------")
    {
        var item = {
            id: (Math.random().toFixed(2)) * 100,
            name: '小明',
            age: 18
        }
        var fn1 = function () {
            console.log(this.name);
            console.log(this.age);
            console.log(this.id);
        }
        var person={
            id:100,
            action:fn1  //类似于继承
        }


        //this指向为item
        // fn1.apply(item);
        // fn1.call(item);
        // fn1.bind(item)();
        // person.action();
        // person.action.apply(item);
        // person.action.call(item);
    }
    console.log("--------------------02、call、apply、bind的区别------------------------------")
    {
        //01、  call、apply、bind区别？
        //apply和call的区别：
        //call和apply的参数不一样，call的参数是按顺序的，apply的参数是数组
        var a=[1,2,3];
        function fn(title,value) {
            //return  '${this.a} ${title} ${value}';
            return this.a+' '+title+' '+value;
        }
        var obj={
            a:1,
            action:fn
        }

        var result01 = fn.apply(obj, ['apple',a]);
        console.log(result01);
        var result02 = fn.call(obj, 'call',a);
        console.log(result02);

        //bind
        // 用于创建一个新的函数,该函数的上下文被绑定到指定的对象，但并不会立即执行。
        // 当调用这个新函数的时候，bind的第一个参数会作为新函数的this,bind第二个参数开始，就是新函数的参数
        var bind01 = fn.bind(obj, 'bind',a);
        console.log(bind01());

    }


}
