window.onload = function () {
    console.log("--------------------01、数组解构---------------------------")
    {
        // 什么是解构:
            //左右进行“模式匹配”，右边的值赋给左边的变量
        // 解构:
            //1、数组解构
            //2、对象解构
        console.log("--------------------01、数组解构-----------------------")
        // 1、数组解构:
        let arr = [1, 2, 3, 4, 5, 7, 8, 9, 10];
        // let [a, b, c, d, e] = arr;
        // console.log(a, b, c, d, e);
        // 数组解构:
        let [a, b, ...c] = arr;//剩余运算符
        console.log(a, b);
        console.log(c);
        for (let i of c) {
            console.log(i);
        }
        console.log("----------------------02、对象解构-----------------------")
        // 2、对象解构:
        let obj = {
            name: "张三",
            age: 18,
            sex: "男",
            address: "北京"
        };
        let {name, address, ...c1} = obj;
        console.log(name, address);
        console.log(c1);
        for (let i of Object.keys(c1)){
            console.log(i,c1[i]);
        }
        console.log("----------------------03、解构处理默认值---------------------")
        {
            //1、数组
            console.log("-----------------------------------------")
            let arr = [100,200];
            if (arr[0]===100){
                console.log("默认值匹配！");
            }else {
                console.log("默认值不对！");
            }

            console.log("-----------------------------------------")
            let [x=1,...y] = arr;//默认值
            // x=arr[0]||1;
            // y=arr.slice(1);
            // x=arr[0]||1;
            //默认值1，什么时候生效？
            // 当数组中的第一个值存在时，默认值失效
            console.log(x,y);

            console.log("-----------------------------------------")
            //2、对象
            let obj = {
                name: "张三",
                age: 18,
                sex: "男",
                address: "北京"
            };
            let {name="李四", age = 20,...c2} = obj;
            console.log(name, age);
            console.log(c2);

        }

    }
}
