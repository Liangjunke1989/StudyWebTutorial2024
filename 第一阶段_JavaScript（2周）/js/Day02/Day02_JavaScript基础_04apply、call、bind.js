window.onload = function () {
    console.log("--------------------01、call、apply、bind------------------------------")
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

        //call、apply、bind区别？
        //this指向为item
        fn1.apply(item);
        fn1.call(item);
        fn1.bind(item)();

    }
}
