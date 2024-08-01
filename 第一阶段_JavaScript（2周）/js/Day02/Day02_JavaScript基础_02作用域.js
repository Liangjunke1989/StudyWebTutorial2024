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
    console.log("-----------------4、基础用法四------------------------")
    {
        var a = 10;
        function fn() {
            console.log(a);
            a = 20;
            console.log(a)
            var a;
            console.log(a);
        }
        fn(); //undefined   20  20
        console.log(a); //10
    }
    console.log("-----------------5、基础用法五------------------------")
    {
        var a = 10;
        function fn() {
            var b=2*a;
            var a=20;
            var c=a+1;
            console.log(b);
            console.log(a);
            console.log(c)
        }
        fn(); //NAN  20   21
        console.log(a); //10
    }
}
