window.onload = function () {
    //向上，向下，四舍五入取整
    // var n = 9.01234;
    // Math.ceil(n);
    // Math.floor(n);
    // Math.round(n);

    // 数组常用的属性和方法
    // 属性：
    // 数组长度 length
    // 方法：
    // toString() 把数组转换为数组值（逗号分隔）的字符串。
    // join() 方法也可将所有数组元素结合为一个字符串
    // unshift() 方法（在开头）向数组添加新元素
    // push() 方法（在数组结尾处）向数组添加一个新的元素
    // pop() 方法从数组中删除最后一个元素
    // shift() 方法会删除首个数组元素，并把所有其他元素“位移”到更低的索引

    // splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那
    // 些被删除的元素。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组
    // slice()返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素
    // concat() 方法用于连接两个或多个数组
    // sort ()排序
    // reverse() 方法用于颠倒数组中元素的顺序

    // for循环遍历
    // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
    // every()对数组的每一项都运行给定的函数，每一项都返回 ture,则返回 true
    // some()方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩
    // 余的元素不会再执行检测,
    // 如果没有满足条件的元素，则返回false。
    // filter()对数组的每一项都运行给定的函数，返回 结果为 ture 的项组成的数组
    // map()方法通过对每个数组元素执行函数来创建新数组
    // reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

    //1、添加删除
    // unshift() 方法（在开头）向数组添加新元素
    // push() 方法（在数组结尾处）向数组添加一个新的元素
    // pop()  方法从数组中删除最后一个元素
    // shift() 方法会删除首个数组元素，并把所有其他元素“位移”到更低的索引

    // splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那
    //          些被删除的元素。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组
    // slice()返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素

    //2、类型转换
    // toString() 把数组转换为数组值（逗号分隔）的字符串。
    // join() 方法也可将所有数组元素结合为一个字符串

    //3、循环
    // for循环遍历
    // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
    // map()方法通过对每个数组元素执行函数来创建新数组


    console.log("--------------测试forEach-------------------------");
    {
        //let和const的区别
        // let 和 const 的区别在于：
        // let 声明的变量只在其声明所在的代码块内有效，而 const 声明的变量则在整个代码块内有效。
        // 如果在代码块内部，使用 const 声明的变量，则必须先声明，再使用。
        // 如果在代码块内部，使用 let 声明的变量，则可以先使用，再声明
       var arr = ['x','y','z'];
        arr.forEach(function(item,index){
            console.log(index+":"+item);
        });
    }

    console.log("--------------测试splice和slice-------------------------");
    {
        arr.splice(0,2,'a','b');
        console.log(arr);
        var s = arr.slice(1,2);//包含/['y']
        console.log(s);
    }


    console.log("--------------测试map-------------------------");
    {
        var newArr = arr.map(function(item,index){
            return item+1
        })
        console.log(newArr);
        console.log(arr);
    }


    console.log("-------------测试map案例01-------------------------");
    {
        var arr2 = [{id:1,v:'x1'},{id:2,v:'x2'},{id:3,v:'x3'}];
        //[1,2,3] 或[{id:1},{id:2},{id:3}]
        // var arr3 =[];
        // for(var i=0;i<arr2.length;i++){
        //     arr3.push(arr2[i].id)
        // };
        // console.log(arr3)

        //或
        var arr4 = arr2.map(function(item){
            return{id:item.id,abc:item.v}
        })
        console.log(arr4)
    }

    console.log("-------------测试map案例02-------------------------");
    {
        var arr5=arr2.map(function(item){
            return {id:item.id-1,v:"LJK_"+item.v};
        });
        console.log(arr5);
    }


    //4、计算
    // every()对数组的每一项都运行给定的函数，每一项都返回 ture,则返回 true
    // some()方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩
    // 余的元素不会再执行检测,
    // 如果没有满足条件的元素，则返回false。
    // filter()对数组的每一项都运行给定的函数，返回 结果为 ture 的项组成的数组
    // reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
    // concat() 方法用于连接两个或多个数组
    // sort ()排序
    // reverse() 方法用于颠倒数组中元素的顺序
    console.log("-------------01、测试回调函数-------------------------");
    {
        function fnTest(callback){
            callback()
        }
        fnTest(function () {
            console.log("测试回调函数")
        })
    }

    console.log("-------------02、测试当前元素  索引-------------------------");
    {
        var f=[19,20,22,34].filter(function(item,index){
            return item>=20;
        });
        console.log(f)
        console.log(f.length);
    }

    console.log("-------------03、测试过滤和模糊查询，filter-------------------------");
    {
        {
            //过滤
            var arr6 = arr2.filter(function(item){
                return item.id>1;
            })
            console.log(arr6);

            //模糊查询
            var testStr="r";
            var arr3=['red','blue','green', 'green', 'blue', 'yellow'];
            var arr7=arr3.filter(function(str){
                return str.includes(testStr);
            })
            console.log(arr7);
        }
    }

    console.log("-------------04、测试是否存在，some和every-------------------------");
    {
        var arr8=[1,2,3,4,5,6,7,8,9,10];
        var arr9=[1,2,3,4,5];
        console.log(arr8.some(function(item){
            return item>3; // 有一个大于3的就返回true
        }))
        console.log(arr9.every(function(item){
            return item>3; // 全部大于3才返回true
        }))
    }

    console.log("-------------05、测试累加，reduce-------------------------");
    {
        var arr10=[1,2,3,4,5,6,7,8,9,10];
        //累加
        var sum=arr10.reduce(function(pre,cur){
            return pre+cur;
        })
        console.log(sum);
        var sum02=arr10.reduce((pre,cur)=>{
            return pre+cur;
        },10)//10是累加的初始值
        console.log(sum02);
    }

    console.log("-------------06、测试合并数组，concat-------------------------");
    {
        //方式一：
        var arr11=[1,2,3,4,5,6,7,8,9,10];
        var arr12=[11,12,13,14,15,16,17,18,19,20];
        var arr13=arr11.concat(arr12);
        console.log(arr13);
        //方式二：
        var arr14=[...arr11,...arr12]
        console.log(arr14);
    }

    console.log("-------------07、测试排序，sort,reverse-------------------------");
    {
        var arr15=[1,2,3,4,5,6,7,8,9,10,11];
        var arr16=arr15.sort(function(a,b){
            return b-a;
        });
        //上面这行改用lambda表达式
        arr16.sort((a,b)=>{
            return b-a;
        });


        console.log(arr16); //降序,常识印象中的降序,此时arr15=[11,10,9,8,7,6,5,4,3,2,1]
        arr15.sort();//默认升序
        console.log(arr16); //升序，此时arr15=[1,10,11,2,3,4,5,6,7,8,9]
        //下面的arr16的值变了？这里需要注意！！！
    }

    console.log("-------------08、测试lambda表达式-------------------------");
    {
        var arr17=['green','red','blue'];
        arr17.forEach(item=>{
            console.log(item);
        })
        arr17.forEach((item,index)=>{
            console.log(index+":"+item);
        })//这是lambda表达式的写法
        var arr18=arr17.sort((a,b)=>{
            return a-b
        });//这是lambda表达式的写法
        console.log(arr18);
        var arr19=arr17.sort((a,b)=>
            a.length-b.length)//这是箭头函数的写法,按照字符长度排序
        console.log(arr19)
    }
}



