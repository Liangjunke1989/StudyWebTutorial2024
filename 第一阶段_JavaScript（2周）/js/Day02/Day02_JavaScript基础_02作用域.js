window.onload = function () {
   //作用域
    var a = 10;
    function fn() {
        var b = 20;
        console.log(a);
        console.log(b);
    }
    fn();
    console.log(a);
}
