window.onload = function () {
    //this关键字
    //this是一个指针型变量，它动态指向当前函数的运行环境，随着函数使用场合不同，会发生变化
    var obj = {
        name: '小明',
        age: 18,
        show: function () {
            console.log(this.name + ',' + this.age);
        }
    }
    obj.show();
}
