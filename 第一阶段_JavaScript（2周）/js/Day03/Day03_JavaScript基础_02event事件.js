window.onload = function () {
    function f(name) {
        return document.querySelector(name);
    }
    f('#testBtn').onclick=function () {
        console.log('#testBtnClick!');//当下面有同样的方法时，会覆盖前面的方法
    }
    f('#div1').onclick=function () {
        console.log('#div1');
        this.style.backgroundColor='black';
    }
    f('#div2').onclick=function () {
        console.log('#div2');
        this.style.backgroundColor='yellow';
    }
    f('#div3').onclick=function (e) {
        e.stopPropagation();
        console.log('#div3');

    }
    f('#div4').onclick=function () {
        console.log('#div4');
    }
    //事件对象：event
    console.log("--------------------02、事件对象 event------------------------------")
    f('#testBtn').onclick=function (e) {
        e.stopPropagation();

        console.log('#testBtn');
        console.log(e.target); //获取当前点击的元素
        console.log(e.currentTarget);//获取当前绑定的元素
        //target和currentTarget的区别？？？

    }


}
