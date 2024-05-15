window.onload = function () {
    console.log("-----------------------------01、深拷贝、浅拷贝基础-----------------------------")
    /*  深拷贝和浅拷贝？
        深拷贝是拷贝引用指向的对象，拷贝的是对象，而不是拷贝引用。
        浅拷贝，浅拷贝是拷贝引用，拷贝的是引用，而不是拷贝引用指向的对象。
     */
    //理解深浅拷贝的关键在于理解值类型和引用类型，根本上是理解堆和栈。
    console.log("-----------------------------JavaScript的堆和栈----------------------------")
    {
        //栈内存：存储基本数据类型
        //堆内存：存储引用数据类型
        //栈：“先进后出，后进先出”
        //堆：“先进先出，后进后出”

        /*
            JavaScript的内存管理机制:
                由垃圾回收器自动管理和手动释放
        */
    /*
        深浅拷贝的本质是对JavaScript数据类型的应用。
            （1）基本类型数据保存在栈中，引用数据类型保存在堆中。
            （2）所有创建new出来的对象，都是引用类型。
        1、基本数据类型：
            Number
            String
            Boolean
            Null
            Undefined
            Symbol
            BigInt
       2、引用数据类型：
            Object
            Array
            Function
            Map
            Set
            ...
    */
    }
    {
        //是否是引用类型？
        var a = 10;
        var b = a;
        //当a发生变化时，b是否会随着a的变化而变化？
        //变化了    浅拷贝
        //不变     深拷贝
    }
    console.log("-----------------------------02、深拷贝_值不变---------------------------------------")
    //深拷贝：
    {
        //两个值没有关系，y不会随着x的变化而变化
        var x = 10;
        var y = x;
        console.log(y);  //10
        x = 100;
        //y = 88;
        console.log(y); //10
        y=99;
        console.log(y);
    }

    console.log("-----------------------------03、浅拷贝_值变化--------------------------------")
    {
        console.log("-----------------------------浅拷贝案例01----------------------------")
        var arr1 = [1,2,3];
        var arr2 = arr1;

        arr1[1] = 100;//更改了原始的值
        console.log(arr2);  //[ 1, 100, 3 ]//拷贝的值居然也发生了变化

        arr2[1] = 888;//改变了拷贝的值
        console.log(arr1); //[ 1, 888, 3 ]//原始的值也发生了变化

        var o1 = {id:10};
        var o2 = o1;
        o2.id = 999;
        console.log(o1); //{ id: 999 }    //这里居然影响了原始的值？为什么？
    }
    {
        console.log("-----------------------------浅拷贝案例02----------------------------")
        var arr17=[1,2,3,4,5,11,10,21];
        var arr18=arr17.sort((a,b)=>{
            return a-b
        });
        console.log("arr18:"+arr18);//[ 1, 2, 3, 4, 5, 10, 11, 21 ]
        var arr19=arr17.sort();
        arr19[1]=100;//居然同时影响了arr17和arr18？
        console.log("arr17:"+arr17);//[ 1, 100, 3, 4, 5, 10, 11, 21 ]
        console.log("arr18:"+arr18);//[ 1, 100, 11, 2, 21, 3, 4, 5]
        console.log("arr19:"+arr19);//[ 1, 100, 3, 4, 5, 10, 11, 21 ]
    }
    //是不是引用类型只能是浅拷贝了呢？
    //如何实现引用类型深拷贝？


}



