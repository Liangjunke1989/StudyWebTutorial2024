window.onload = function () {
    console.log("--------------------02、const的使用---------------------------")
    {
        console.log("--------------------01、const的使用------------------------")
        {
            //1、const声明的变量，不能重复声明
            //2、const声明的变量，不能在声明之前使用
            //3、const声明的变量，不能修改
            console.log("----------01、const声明的变量，不能重复声明-----------")
            {
               // const a;//报错
               // a = 1;  //报错
                //console.log(a);
                //a = 2;//报错
            }
            console.log("----------02、const声明的变量，不能在声明之前使用-----------")
            {
                //console.log(a);//报错
                const a = 1;
                console.log(a);
            }
            console.log("----------03、const声明的变量，不能修改-----------")
            {
                const a = 1;
                console.log(a);
                //a = 2;//报错
                const arr = [1, 2, 3];
                arr.push(4);//可以修改
                console.log(arr);
            }
        }

    }

}
