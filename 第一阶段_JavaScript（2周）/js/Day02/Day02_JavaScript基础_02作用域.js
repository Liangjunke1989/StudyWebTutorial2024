window.onload = function () {
   //作用域
    console.log("-----------------1、基础用法一------------------------")
    {
        var a = 10;
        function fn() {
            console.log(a);
            var a = 20;
        }
        fn();
        console.log(a);
    }
    console.log("-----------------2、基础用法二------------------------")

}
