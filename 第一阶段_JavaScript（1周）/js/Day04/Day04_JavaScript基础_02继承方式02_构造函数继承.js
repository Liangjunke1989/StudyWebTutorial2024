window.onload = function () {
    console.log("--------------------02、构造函数继承方式------------------------------")
    {
        //第二种：构造函数继承
        //总结：
        //1、构造函数继承：
        //  1）创建一个子类的构造函数，并调用父类的构造函数，实现继承。
        //  2）子类的构造函数中，调用父类的构造函数，实现继承。
        //  3）子类的构造函数中，使用call/apply方法，实现继承。
        //  4）子类的构造函数中，使用Object.create方法，实现继承。
        //  5）子类的构造函数中，使用Object.setPrototypeOf方法，实现继承。
        //  6）子类的构造函数中，使用Object.defineProperty方法，实现继承。
        console.log("--------------------001、创建Person对象------------------------------")

        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.type="人";
        }

        Person.prototype.say = function () {
            console.log("我是" + this.name + ",今年" + this.age + "岁");
        }
        console.log("--------------------002、创建Student对象------------------------------")
        function Student(name, age, score) {
            Person.call(this, name, age);//构造函数继承
            this.sex = "男生或女生";
            this.score = score;
        }
        Student.prototype.say = function () {
            console.log("我是" + this.name + ",今年" + this.age + "岁,成绩是" + this.score);
        }
        console.log("--------------------003、测试一------------------------------")

        let s1 = new Student("张三", 18, 100);
        s1.__proto__.type = "中国人";
        let s2 = new Student("李四", 19, 99);
        console.log(s1.__proto__.type===Student.prototype.type);//"中国人"
        console.log(s2.__proto__.type===s1.__proto__.type);//
        console.log(s1);
        console.log(s2);
        console.log(Student.prototype);
        console.log(s1.type);//"人"//此时没有用到原型对象
        console.log(s2.type);//"人"//此时没有用到原型对象
        console.log(s2.__proto__.type);//"中国人"//此时用到了原型对象




    }
}
