window.onload = function () {
    // 对象常用的属性和方法
    // JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串;
    // JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
    // hasOwnProperty() 该方法可以判断对象的自有属性是否存在
    // assign() 该方法主要用于对象的合并
    // defineProperties()直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    // keys() 返回一个由一个给定对象的自身可枚举属性组成的数组
    // values();返回一个给定对象自己的所有可枚举属性值的数组
    // entries();返回一个给定对象自身可枚举属性的键值对数组
    console.log("------------------------01、object基础操作-----------------------------")
    var o1 = {
        id:1,
        name:'ff'
    };
    // o1['id'] //
    // var a = 'id';
    // o1[a]   //变量
    //.和[]的区别  .只能是自身的属性 []即可以是自身的属性也可以是变量

    // hasOwnProperty() 该方法可以判断对象的自有属性是否存在
    console.log(o1.hasOwnProperty('id'))  //true

    function Test(){};
    Test.prototype.id = 100;

    var t = new Test();
    t.value = 'test';
    console.log(t.hasOwnProperty('id')) //判断对象的自有属性是否存在
    console.log('id' in t); //true  in 运算符 检测属性是否存在某个对象中，针对自有属性和继承属性都返回true

    //// assign() 该方法主要用于对象的合并
    var o2 = {id:1};
    var o3 = {v:100};
    var o4 = Object.assign(o2,o3);
    //var o4 = {...o2,...o3}
    console.log(o4); //{ id: 1, v: 100 }
    console.log("------------------------02、object类型转换-----------------------------")
    //类型转换
    // keys() 返回一个由一个给定对象的自身可枚举属性组成的数组
    // values();返回一个给定对象自己的所有可枚举属性值的数组
    // entries();返回一个给定对象自身可枚举属性的键值对数组
    var o5 = { id: 1, v: 100 };
    console.log(Object.keys(o5)) //[ 'id', 'v' ]
    console.log(Object.values(o5)) //[ 1, 100 ]
    console.log(Object.entries(o5)) //[ [ 'id', 1 ], [ 'v', 100 ] ]


    console.log("------------------------03、object_for in_循环-----------------------------")
    //循环 for in
    var o5 = { id: 1, v: 100 };
    for(var key in o5){
        console.log(key) //拿到的是键
        console.log(o5[key])//拿到的是值
        console.log(o5.id)//1
        console.log(o5.v)// 100
    }

    console.log("------------------------04、object_defineProperties_仅面试常用--------------")
    // defineProperties()直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    var o6 = {};
    // Object.defineProperty(o6,'id',{
    //     value:10,
    //     writable:false  //属性是否可以修改  true可修改  false只读
    // })
    // console.log(o6);
    // o6.id = 99;
    // console.log(o6.id);

    // Object.defineProperties(o6,{
    //     'id':{
    //         value:10,
    //         writable:false
    //     },
    //     'name':{
    //         value:'ff',
    //         writable:true
    //     }
    // })
    // console.log(o6);
    // o6.id = 99;
    // console.log(o6.id);

    var obj = {};
    var initValue = 0;
    Object.defineProperty(obj,'id',{
        get:function(){
            return initValue;
        },
        set:function(value){
            initValue = value;
        }
    })
    obj.id = 100;

}



