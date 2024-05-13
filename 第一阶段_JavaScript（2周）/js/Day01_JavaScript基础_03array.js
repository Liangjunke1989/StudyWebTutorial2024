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
    var arr = ['x','y','z'];
    arr.forEach(function(item,index){
        console.log(index+":"+item);
    });
    console.log("--------------测试splice和slice-------------------------");
    arr.splice(0,2,'a','b');
    console.log(arr);
    var s = arr.slice(1,2);//包含/['y']
    console.log(s);

    console.log("--------------测试map-------------------------");
    var newArr = arr.map(function(item,index){
        return item+1
    })
    console.log(newArr);
    console.log(arr);

    console.log("-------------测试map案例01-------------------------");
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
    console.log("-------------测试map案例02-------------------------");
    var arr5=arr2.map(function(item){
       return {id:item.id-1,v:"LJK_"+item.v};
    });
    console.log(arr5);



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
    console.log("-------------测试回调函数-------------------------");
    function fnTest(callback){
        callback()
    }
    fnTest(function () {
        console.log("测试回调函数")
    })
}



