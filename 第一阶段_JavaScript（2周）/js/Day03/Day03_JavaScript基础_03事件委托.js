window.onload = function () {
    console.log("--------------------01、事件冒泡------------------------------")
    {
        //事件委托：
        //事件委托就是把事件绑定在父元素上，然后通过事件冒泡，把事件委托给子元素。
        function f(name) {
            return document.querySelector(name);
        }
        f('#div1').onclick=function () {
            console.log('#div1');
            this.style.backgroundColor='black';
        }
    }
    console.log("--------------------02、事件委托------------------------------")
    {
        var list = document.getElementById('list');//委托给ul
        list.onclick=function (e) {//绑定ul
            if(e.target.nodeName==='LI'){//判断当前点击的元素是否是li
                console.log(e.type);
                e.target.style.color='red';
                console.log(e.target.innerHTML);
            }
        }



    }
}
