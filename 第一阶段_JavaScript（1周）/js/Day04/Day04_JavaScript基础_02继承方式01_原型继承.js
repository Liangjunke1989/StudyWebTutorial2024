window.onload = function () {
    console.log("--------------------01、原型继承------------------------------")
    {
        //第一种：原型继承
        //核心总结：
        //原型继承：同一个new的对象，所有实例化对象都指向同一个原型对象。
        //原型继承：修改原型对象的值，会改变所有实例化对象的值。

        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        function Student(id, score) {
            this.id = id;
            this.score = score;
        }

        function Teacher(title) {
            this.title = title;
        }

        console.log("------------------01、测试原型继承01--------------------------------")
        Student.prototype = new Person();//原型继承
        var s1 = new Student("001", "100");
        var s2 = new Student("002", "110");
        s1.name = "小明";
        s2.name = "小李";
        console.log(s1.name)
        console.log(s2.name)
        console.log("------------------02、测试原型继承02--------------------------------")
        Teacher.prototype = new Person();//原型继承
        var t1 = new Teacher("副教授");
        var t2 = new Teacher("教授");
        t1.name = "老李";
        t1.age = "40";
        t2.name = "老王";
        t2.age = "50";
        console.log(t1)
        console.log(t2)
        console.log("------------------03、修改原型对象的值--------------------------------")
        s1.__proto__.name = "小红";//修改原型对象的值
        s1.__proto__.age = "18";


        console.log("-----------------01、相同---------------------")
        //new Student()同一个对象
        console.log(s1.__proto__);
        console.log(s2.__proto__);
        console.log(s1.__proto__===s2.__proto__);//new Student()同一个对象

        console.log("-----------------02、不一定相同-------------------")
        console.log(s1.__proto__);//Student.prototype;继承自Person.prototype
        console.log(t1.__proto__);//Teacher.prototype;继承自Person.prototype
        console.log(s1.__proto__ === t1.__proto__)//false,因为s1.__proto__是Student.prototype,t1.__proto__是Teacher.prototype


        console.log("-----------------03、相同----------------------")
        //同一个示例化对象的__proto__.__proto__是同一个对象
        //Person.prototype
        console.log(s1.__proto__.__proto__);//Person.prototype，s1.__proto__.__proto__是Person.prototype
        console.log(t1.__proto__.__proto__);//Person.prototype，t1.__proto__.__proto__是Person.prototype
        console.log(s1.__proto__.__proto__ === t1.__proto__.__proto__)//true,因为s1.__proto__.__proto__是Person.prototype,t1.__proto__.__proto__是Person.prototype


        console.log("-----------------04、不同----------------------")
        //new Student()和new Teacher()不是同一个对象
        console.log(s1.__proto__);//Student.prototype
        console.log(t1.__proto__);//Teacher.prototype
        console.log(s1.__proto__ === t1.__proto__)//false,因为s1.__proto__是Student.prototype,t1.__proto__是Teacher.prototype
        console.log(s1.__proto__.name);//s1.__proto__.name是小红
        console.log(t1.__proto__.name);//t1.__proto__.name是undefined，没有随着s1的修改而改变

        console.log("-----------------05、改为同一个----------------------")
        var person = new Person();// 要同一个实例化对象才可以，随着s1的修改而改变
        Student.prototype = person;//这个是关键，指向同一个实例化对象
        Teacher.prototype = person;//这个是关键，指向同一个实例化对象
        var s11 =new Student("001", "100");
        var t11 =new Teacher("DaWang");
        s11.__proto__.name = "小红";
        console.log(s11.__proto__.name);//s11.__proto__是Student.prototype，是实例化对象person
        console.log(t11.__proto__.name);//t11.__proto__是Person.prototype，是实例化对象person，和上面是同一个实例化对象

        console.log("-----------------06、再次改变父父对象---------------------")
        s11.__proto__.__proto__.name = "小光";//为object对象添加了name属性
        console.log(s11.__proto__.__proto__);//object Person.prototype
        console.log(t11.__proto__.__proto__);//也随着发生改变了
        //核心总结：
        //原型继承：修改原型对象的值，会改变所有实例化对象的值。


    }

}
