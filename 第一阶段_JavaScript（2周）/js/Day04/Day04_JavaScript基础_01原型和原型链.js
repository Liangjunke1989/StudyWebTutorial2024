window.onload = function () {
    //原型和原型链
    //1、原型：
    //1.1、原型是函数的属性，每个函数都有prototype属性，这个属性是一个对象，
    // 这个对象有一个constructor属性，
    // 这个属性是一个函数，这个函数就是这个原型所在的构造函数，这个函数的prototype属性就是这个原型。
    //1.2、原型的作用：
    //1.2.1、原型的作用就是为构造函数添加属性和方法
    console.log("--------------------01、创建对象------------------------------")
    {
        // 1、创建对象：方式一
        function Person() {
            this.name = "Liang";
            this.age = 35;
            this.sayName = function () {
                console.log("我的名字是" + this.name)
            }
        }

        Person.prototype.sex = "男";
        Person.prototype.sayAge = function () {
            console.log("我的年龄是" + this.age)
        }

        var person = new Person();//创建对象
        console.log(person.sex);
        person.sayName();
        person.sayAge();
    }
    console.log("--------------------02、工厂模式------------------------------")
    {
        // 2、创建对象：方式二：工厂模式
        // 工厂模式一
        function createPerson(name, age) {
            var obj = new Object();
            obj.name = name;
            obj.age = age;
            obj.say = function () {
                console.log(`我的名字是${this.name}`, `我的年龄为${this.age}`);
            }
            return obj;
        }

        //工厂模式二
        function createPerson2(name, age) {
            return {
                name: name,
                age: age,
                say: function () {
                    console.log(`我的名字是${this.name}`, `我的年龄为${this.age}`)
                }
            }
        }

        //根据工厂模式一创建对象
        let person2 = createPerson('LJK', '36');
        person2.sex = "男";
        console.log(person2.sex);
        person2.say();
        //根据工厂模式二创建对象
        let person3 = createPerson2('ZYD', '33');
        person3.sex = "女";
        console.log(person3.sex);
        person3.say();
    }

    console.log("--------------------03、普通对象和函数对象的区别------------------------------")
    {
        // 3、创建对象：方式三：普通对象和函数对象的区别
        function f1(a, b) {
            console.log(a, b);
        }
        var o1 = {
            f2: function (a, b) {
                console.log(a, b);
            }
        };
       //查看类型
       //  console.log(typeof f1);//function
       //  console.log(typeof o1);//object

        //1、函数有prototype属性
        f1.prototype.add = function (a, b) {
            return a + b;
        };
        f1.call(o1, 1, 2);
        o1.f2(1, 2);

        //2、普通对象没有prototype属性，有__proto__属性
        var o2 = new f1(3, 4);
        o2.__proto__.id = "12345";//给对象新增属性,所有对象都有__proto__属性
        o2.add = function (a, b) {
            return a + b;
        };
        console.log(`新增的ID为${o2.id}`);
        console.log("新增对象的方法为：", o2.add(1, 2));
        console.log("------------------------------------")
        o1.__proto__.add=function (a, b) {
            return a + b;
        };
        var o3=new o1.f2(5,6);//创建对象  //类似于构造函数
        console.log("新对象为：",o3.constructor);
        console.log("新对象的类型为：",typeof o3);  // object
        console.log("新对象的增加方法结果为：",o3.add(5,6));
    }

    console.log("--------------------04、创建对象：引申使用class------------------------------")
    {
        // 4、创建对象：方式四：class
        class Person11 {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
            say() {
                console.log(`我的名字是${this.name}`, ` 我的年龄为${this.age}`);
            }
        }
        var p1 = new Person11('LJK111', 36 + 1);
        p1.say();
    }
}

