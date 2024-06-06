
window.onload = function () {
    console.log("-----------------------------01、深拷贝、浅拷贝基础-----------------------------")
    /*  深拷贝和浅拷贝？
        深拷贝是拷贝引用指向的对象，拷贝的是对象，而不是拷贝引用。
        浅拷贝，浅拷贝是拷贝引用，拷贝的是引用，而不是拷贝引用指向的对象。
     */
    //理解深浅拷贝的关键在于理解值类型和引用类型，根本上是理解堆和栈。
    console.log("-----------------------------JavaScript的堆和栈------------------------------")
    //深浅拷贝需要的基础知识
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
                （3）引用类型会在栈里存储一个指针，指向堆内存中存储的对象。
            1、基本数据类型：
                Number
                String -------和C#不一样，C#中String是引用类型。
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
    //判断深浅拷贝的关键
    {
        var a = 10;
        var b = a;
        //当a发生变化时，b是否会随着a的变化而变化？
        //变化了    浅拷贝
        //不变     深拷贝
    }
    console.log("-----------------------------02、深拷贝_值不变--------------------------------")
    //深拷贝案例：
    {
        //两个值没有关系，y不会随着x的变化而变化
        var x = 10;
        var y = x;
        console.log(y);  //10
        x = 100;
        //y = 88;
        console.log(y); //10
        y = 99;
        console.log(y);
    }

    console.log("-----------------------------03、浅拷贝_值变化--------------------------------")
    //浅拷贝案例01：
    {
        console.log("-----------------------------浅拷贝案例01----------------------------")
        var arr1 = [1, 2, 3];
        var arr2 = arr1;

        arr1[1] = 100;//更改了原始的值
        console.log(arr2);  //[ 1, 100, 3 ]//拷贝的值居然也发生了变化

        arr2[1] = 888;//改变了拷贝的值
        console.log(arr1); //[ 1, 888, 3 ]//原始的值也发生了变化

        var o1 = {id: 10};
        var o2 = o1;
        o2.id = 999;
        console.log(o1); //{ id: 999 }    //这里居然影响了原始的值？为什么？
    }
    //浅拷贝案例02：
    {
        console.log("-----------------------------浅拷贝案例02----------------------------")
        var arr17 = [1, 2, 3, 4, 5, 11, 10, 21];
        var arr18 = arr17.sort((a, b) => {
            return a - b
        });
        console.log("arr18:" + arr18);//[ 1, 2, 3, 4, 5, 10, 11, 21 ]
        var arr19 = arr17.sort();
        arr19[1] = 100;//居然同时影响了arr17和arr18？
        console.log("arr17:" + arr17);//[ 1, 100, 3, 4, 5, 10, 11, 21 ]
        console.log("arr18:" + arr18);//[ 1, 100, 11, 2, 21, 3, 4, 5]
        console.log("arr19:" + arr19);//[ 1, 100, 3, 4, 5, 10, 11, 21 ]
    }

    console.log("-----------------------------04、深浅拷贝_进阶知识----------------------------")
    /*
           出现的新问题？
               1、是不是引用类型只能是浅拷贝了呢？
               2、如何实现引用类型深拷贝？
    */
    {
        // 数组常用添加删除的方法：
        {
            /*
                 unshift() 方法（在开头）向数组添加新元素
                 push()    方法（在数组结尾处）向数组添加一个新的元素
                 pop()     方法 从数组中删除最后一个元素
                 shift()   方法 会删除首个数组元素，并把所有其他元素“位移”到更低的索引
          */
        }
        // 二维数组的基本概念：
        {
            // var arr1 = [1, 2, 3];
            // var arr2 = [4, 5, 6];
            // var arr3 = [arr1, arr2];
            // console.log(arr3);
            // //[ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
            // arr1.push(7);
            // console.log(arr3);
            // //[ [ 1, 2, 3, 7 ], [ 4, 5, 6 ] ]
        }
    }
    // 案例01_实现了深拷贝效果:
    {
        console.log("-------------------案例01_concat实现了深拷贝效果00:-----------------------------");
        var arr1 = [1, 2, 3];
        //var arr2 = arr1;  //浅拷贝，无论改变arr1，arr2，arr1和arr2值都不会发生改变。
        var arr2 = arr1.concat();//concat合并
        arr1.push(5);//push，添加元素
        console.log(arr1); //[1,2,3,5]
        console.log(arr2); //[1,2,3]
    }
    // 案例01的实质：arr1.concat(); object.assign();  仍然还是浅拷贝
    // 案例01_concat实现深拷贝效果01:
    {
        console.log("-------------------案例01_concat实现深拷贝效果01:-----------------------------");
        var arr1 = [1, 2, 3, [4, 5]];
        var arr2 = arr1.concat();                    //如果只有一级，暂时可以解决实现深拷贝
        arr1.push(11);
        arr1[3][0] = 100;
        console.log(arr1); //[ 1, 2, 3, [ 100, 5 ], 11 ]
        console.log(arr2); //[ 1, 2, 3, [ 100, 5 ] ]       //仍然是浅拷贝
    }
    // 案例01_assign实现深拷贝效果02
    {
        console.log("-------------------案例01_assign实现深拷贝效果02:-----------------------------");
        var o1 = {id: 1};
        var o2 = Object.assign({}, o1);
        o1.id = 100;
        console.log(o1.id); //100
        console.log(o2.id); //1
    }

    // 多级数据结构测试——assign的本质
    // assign和concat还是浅拷贝，一级数据结构可以解决深拷贝，二级数据结构无法解决深拷贝。
    {
        var o1 = {id: 1, test: 'o1', children: {v: 'o1'}};
        var o2 = Object.assign({}, o1);
        o1.id = 100;
        o2.children.v = 'o2';
        console.log(o1);  //{ id: 100, test: 'o1', children: { v: 'o2' } }
        console.log(o2); //{ id: 1, test: 'o1', children: { v: 'o2' } }
    }


    console.log("-----------------------------05、深拷贝_真正实现深拷贝，json序列化----------------")
    //测试创建对象，也是浅拷贝
    {
        //创建对象的两种方式：
        //方式一：
        var obj1 = {
            name: 'fangfang',
            age: 18,
            children: {id: 1}
        }
        //方式二：
        var obj2 = new Object();
        obj2.name = obj1.name;
        obj2.age = obj1.age;
        obj2.children = obj1.children;

        //更改obj1的属性值
        obj1.name = 'alice';
        obj1.children.id = 99;
        //查看结果，发现此种也是浅拷贝
        console.log(obj1); //{ name: 'alice', age: 18, children: { id: 99 } }
        console.log(obj2); //{ name: 'fangfang', age: 18, children: { id: 99 } }
    }
    //测试通过JSON序列号的方式实现深拷贝（先转成字符串，再转成对象）
    //深拷贝——json序列号实现深拷贝
    {
        console.log("-----------------------------05、深拷贝_测试通过JSON序列号的方式实现深拷贝（先转成字符串，再转成对象）")
        var obj1 = {
            name: 'fangfang',
            age: 18,
            children: {id: 1},
            action: function () {
                console.log('action')
            }
        }
        var obj2 = JSON.parse(JSON.stringify(obj1));//引用类型实现深拷贝，先转成json字符串，再转成json对象
        obj1.name = 'alice';
        //obj1.children.id = 36;
        obj2.children.id = 99;
        //一级实现深拷贝
        console.log("obj1:  " + obj1.name);
        console.log("obj2:  " + obj2.name);
        //二级实现深拷贝
        console.log("obj1_childrenId:  " + obj1.children.id);
        console.log("obj2_childrenId:  " + obj2.children.id);

        //json序列化，不能序列化函数，所以不能实现深拷贝？？？
    }

    console.log("-----------------------------06、深拷贝_真正实现深拷贝，自己封装-------------------")
    //完美实现深拷贝：引用类型实现深拷贝
    /* 自己封装
        封装的思路：需要递归整个对象树
        1、判断是否是引用类型
        2、判断是否是引用类型，如果是引用类型，则递归调用
     */


    //面试题：基础提供题目的基本内容资料
    {
        var obj = {
            name: 'fangfang',
            age: 18,
            member: [1, 2, 3, 4, 5],
            children: {id: 1},
            action: function () {
                console.log('action')
            }
        }
        // function deep(){

        // };
        //传参可以是数组，也可以是对象
        //deep({},obj1) //第一个参数新对象，第二个参数数据结构
        //deep([],arr0)
    }
    console.log("______前提知识储备：递归函数的基础知识_________")
    //for_in和递归函数的基础知识
    {
        //测试数组
        console.log("______测试数组for in_________")
        {
            // var arr0 = [1, 2, 3, 4, 5];
            // for (var key in arr0) {
            //     console.log("key:"+key);
            //     console.log("Value:"+arr0[key]);
            // }
        }
        console.log("______测试对象for in_________")
        //测试对象
        {
            var obj = {
                name: 'fangfang',
                age: 18,
                member: [1, 2, 3, 4, 5],
                children: {id: 1},
                action: function () {
                    console.log('action')
                }
            }
            for (var key in obj) {
                console.log("key:"+key);///name,age,member,children,action
                console.log("Value:"+obj[key]);//fangfang,18,[1,2,3,4,5],{id:1},function()
            }
        }
        console.log("______用递归函数实现的基本思路_________")
        //扩展——遍历obj，将obj的数据赋值给newObj
        {
            function deep(newObj, obj) {
                var o = newObj;
                //遍历obj，将obj的数据赋值给newObj
                for (var key in obj) {
                    o[key] = obj[key]
                }
                ;
                return o;
            };
            var o1 = deep({}, obj);
            o1.name = 'o1';
            o1.children.id = 888;
            console.log(o1);
        }
    }


    /*
        本节课核心内容
     */
    console.log("-----------------------------06.1、核心:封装递归函数解决多级深拷贝-----------------")
    {
        console.log("-------------------------06.2、练习的第一个公共方法：用递归函数封装的多级深拷贝-----------------")
        //第一个公共方法，面试题
        {
            //遍历一边obj,将obj的值赋值给newObj
            function deep(newObj, obj) {
                var o = newObj;
                //遍历obj，将obj的数据赋值给newObj
                for (var key in obj) {
                    //添加子级判断,是不是引用类型
                    if (typeof obj[key] === 'object') {   //typeof针对数组或对象值都是'object'-----关键因素，数组也是object
                        //判断obj[key]的类型，是数组还是object对象
                        o[key] = (obj[key].constructor === Array) ? [] : {};   //constructor判断是被谁构造出来的
                        //递归
                        deep(o[key], obj[key]);
                    }
                    //当key既不是数组，也不是对象，则直接赋值
                    else {
                        o[key] = obj[key];  //真正实现深拷贝的关键是value的类型判断，value类型为基本类型，才能实现深拷贝
                    }

                }
                return o;
            }
        }
        console.log("-------------------------06.3、测试——自己封装的深拷贝-----------------")
        //测试结果
        {
            var arr0 = [1, 2, [3, 4, [5, 6]]];
            var arr1 = deep([], arr0);
            arr1[0] = 10;
            arr1[2][0] = 20;
            arr1[2][2][0] = 30;
            console.log(arr0);
            console.log(arr1);
        }
    }
}



