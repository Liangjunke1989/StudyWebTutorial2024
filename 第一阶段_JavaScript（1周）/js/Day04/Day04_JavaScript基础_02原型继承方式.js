window.onload = function () {
    console.log("--------------------01、原型继承方式------------------------------")
    {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        Person.prototype.say = function () {
            console.log(this.name + ":" + this.age);
        }//原型方法
        function Student(name, age, score) {
            Person.call(this, name, age);
            this.score = score;
        }

        Student.prototype = new Person();//继承
        Student.prototype.constructor = Student;//重置构造函数
        Student.prototype.say = function () {
            console.log(this.name + "," + this.age + "," + this.score);//this指的是当前对象
        }//重写say方法
        var s1 = new Student("小明", 18, 100);
        s1.say();
    }
}
