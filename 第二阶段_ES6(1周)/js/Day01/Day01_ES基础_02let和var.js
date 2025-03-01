window.onload = function () {
    console.log("--------------------01、let和var---------------------------")
    {
        //1、let和var
        console.log("--------------------01、let和var------------------------")
        {
            //1、let声明的变量，只在{}中有效
            //2、let声明的变量，不能重复声明
            //3、let声明的变量，不能在声明之前使用

            console.log("----------01、let声明的变量，只在{}中有效-----------")
            //1、let声明的变量，只在{}中有效
            {
                let a = 1;
                console.log(a);
            }
            //console.log(a);// 报错
            //var a=1;  //undefined
            //let a = 1; // 报错,不存在变量提升
            console.log("----------02、let声明的变量，不能重复声明-----------")
            //2、let声明的变量，不能重复声明
            {
                let a = 1;
                console.log(a);
                a = 2;
                console.log(a);
            }
            for (var i = 0; i < 5; i++) {
            }
            //console.log(i);//5
            for (let j = 0; j < 5; j++) {
                console.log(j);
            }
            //console.log(j);//报错
            console.log("----------03、let声明的变量，不能在声明之前使用-----------")
            //3、let声明的变量，不能在声明之前使用
            {
                // let a1 = 1;
                // console.log(a1);
                // a1 = 2;
                // console.log(a1);
                // console.log(a1);
                // let a1 = 3;//报错
            }

        }
        console.log("----------03、测试-----------")
        {
            // function fn1(id){
            //     let id = 1;
            //     console.log(id);
            // }
            //fn1(2);
        }


    }
}
