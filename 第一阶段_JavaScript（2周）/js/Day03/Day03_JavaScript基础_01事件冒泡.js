window.onload = function () {
    /*
        事件冒泡：从里到外触发事件
            button -> div4 -> div3 -> div2 -> body -> document
        事件捕获：从外到里触发事件
            document -> body -> div4 -> div3 -> div2 -> button
     */
    console.log("--------------------01、事件冒泡------------------------------")
    {
        var div1 = document.getElementById("div1");
        div1.onclick=function () {
            console.log("div1");
        }
        var div2 = document.getElementById("div2");
        div2.onclick=function () {
            console.log("div2");
        }
        var div3 = document.getElementById("div3");
        div3.onclick=function () {
            console.log("div3");
        }
        var div4 = document.getElementById("div4");
        div4.onclick=function () {
            console.log("div4");
        }
    }
    console.log("--------------------02、事件捕获------------------------------")
    {
        var div1 = document.getElementById("div1");
        var div2 = document.getElementById("div2");
        var div3 = document.getElementById("div3");
        var div4 = document.getElementById("div4");
    }
}
