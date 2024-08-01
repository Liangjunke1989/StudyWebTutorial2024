window.onload = function () {
   //作用域
    console.log("-----------------1、基础用法一------------------------")
    {
        var a = 10;
        function fn() {
            console.log(a);
            var a = 20;
        }
        fn(); //undefined
        console.log(a); //10
    }
    console.log("-----------------2、基础用法二------------------------")
    {
        var a = 10;
        function fn() {
            console.log(a);
            a = 20;
        }
        fn(); //10
        console.log(a); //20
    }
    console.log("-----------------3、基础用法三------------------------")
    {
        var a = 10;
        function fn() {
            console.log(a);
            a = 20;
            console.log(a)
            var a = 30;
            console.log(a);
        }
        fn(); //undefined   20  30
        console.log(a); //10
    }
}
