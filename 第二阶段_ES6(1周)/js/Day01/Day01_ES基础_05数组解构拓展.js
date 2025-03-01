window.onload = function () {
    console.log("--------------------01、数组解构拓展---------------------------")
    {
        // 数组解构拓展
        function fn1(){
            return 88;
        }
        var [a=1,b=fn1()] = [100,200]
        console.log(a,b);//100 200
        var [c=1,d=c] = [100,200]
        console.log(c,d);//100 200
        var [e=1,f=e] = [100]
        console.log(e,f);//100 100
    }
}
