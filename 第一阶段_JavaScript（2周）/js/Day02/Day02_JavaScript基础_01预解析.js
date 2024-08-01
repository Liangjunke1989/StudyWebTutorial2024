window.onload = function () {
    //预解析对象： var  function

    console.log("------------------测试一-------------------------------")
    {
        var a0 =100;
        console.log(a0);

        //var a1;
        console.log(a1);
        var a1 =100;
        //100 , 完全不知道预解析
        //报错， 语言规范，先声明再调用
        //undefined  对的
    }

    console.log("------------------测试二-------------------------------")
    //解析过程
    //变量名和函数名一致的情况下，优先选择函数
    var b=200;
    function b(){
        console.log(999);
    }
    console.log(b);//结果：200

    console.log(b1);//结果：ƒ b1(){
                    //             console.log(999);
                    //           }
    var b1=200;
    function b1(){
        console.log(999);
    }

}
