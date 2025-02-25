window.onload = function () {
    console.log("--------------------01、let和var---------------------------")
    {
        //1、let和var
        //1）let：
        console.log("--------------------01、let和var------------------------")
        {
            //1、let声明的变量，只在{}中有效
            //2、let声明的变量，不能重复声明
            //3、let声明的变量，不能在声明之前使用

            //1、let声明的变量，只在{}中有效
            {
                let a = 1;
                console.log(a);
            }
            //2、let声明的变量，不能重复声明
            console.log(a);// 报错
            //var a=1;  //undefined
            let a = 1; // 报错,不存在变量提升
        }


    }
}
