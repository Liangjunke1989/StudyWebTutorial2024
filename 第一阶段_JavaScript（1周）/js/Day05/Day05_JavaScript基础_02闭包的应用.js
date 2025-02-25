window.onload = function () {
    //闭包的应用：
    // 1、计数器：
    // 2、验证码：
    // 3、防抖动：
    // 4、节流：

    console.log("--------------------02、闭包的应用------------------------------")
    {
        //1、计数器：
        function count() {
            var count = 0;
            return function ()
            {
                count++;
                console.log(count);
            }
        }
        const counter = count();
        counter();//1
        counter();//2

    }
}
