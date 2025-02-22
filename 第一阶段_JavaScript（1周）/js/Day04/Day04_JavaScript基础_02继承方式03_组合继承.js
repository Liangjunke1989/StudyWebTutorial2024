window.onload = function () {
    console.log("--------------------03、原型、构造函数组合继承方式------------------------------")
    {
        //第三种：原型、构造函数组合继承
        //总结：
        //1、原型、构造函数组合继承：
        //  1）创建一个子类的构造函数，并调用父类的构造函数，实现继承。
        //  2）子类的构造函数中，调用父类的构造函数，实现继承。
        //  3）子类的构造函数中，使用call/apply方法，实现继承。
        //  4）子类的构造函数中，使用Object.create方法，实现继承。
        //  5）子类的构造函数中，使用Object.create方法，实现继承。
        //  6）子类的构造函数中，使用Object.defineProperty方法，实现继承。


        console.log("--------------------001、创建Person对象------------------------------")
        {
            function Person(name, age) {
                this.name = name;
                this.age = age;
                this.sex = "男人或女人";
            }

            Person.prototype.say = function () {
                console.log("Person原型对象的Say方法：" + this.name + "," + this.age + "," + this.sex);
            }
            console.log(Person.prototype)
            var p1 = new Person("小李", 17);
            p1.say();
        }
        console.log("--------------------002、创建Student对象------------------------------")
        {
            //student继承person
            function Student(name, age, score) {
                Person.call(this, name, age);//构造函数继承
                this.sex = "男生或女生";
                this.score = score;
            }

            Student.prototype = new Person();//原型继承继承
            Student.prototype.constructor = Student;//重置构造函数
            Student.prototype.say = function () {
                console.log("Student原型对象的Say方法：" + this.name + "," + this.age + "," + this.score);//this指的是当前对象
            }
            var s1 = new Student("小红", 19, 99);
            s1.say();

            //修改了父对象的值
            Person.prototype.say = function () {
                console.log("Person新的原型对象的Say方法：" + this.name + "," + this.age);
            }
            Student.prototype = new Person();//创建原型对象，与上面的不是同一个了
            Student.prototype.constructor = Student;
            Student.prototype.say = function () {
                console.log("Student新的原型对象的Say方法：" + this.name + "," + this.age + "," + this.score);//this指的是当前对象
            }
            var s2 = new Student("小红红", 199, 999);
            console.log(s2.constructor)
            s2.say();//调用的是Person的say 无成绩显示

            //Teacher继承Person
            function Teacher(name, age, jobTitle) {
                Person.call(this, name, age);//继承
                this.jobTitle = jobTitle;
            }

            Teacher.prototype = new Person();
            Teacher.prototype.constructor = Teacher;
            var t1 = new Teacher("梁老师", 36, "老师");
            console.log(t1.constructor)
            t1.say();

        }
        console.log("--------------------003、MaleStudent对象---------------------------")
        {
            console.log("------------------------1、创建MaleStudent构造函数----------------------")

            function MaleStudent(name, age, score) {
                Student.call(this, name, age, score);
                // Student.apply(this,)
            }

            console.log("-------------------------2、MaleStudent继承Student并重置构造函数---------")
            MaleStudent.prototype = new Student();//继承
            console.log(MaleStudent.prototype.constructor)
            MaleStudent.prototype.constructor = MaleStudent;//重置构造函数
            MaleStudent.prototype.say = function () {
                console.log("MaleStudent原型对象1的Say方法：" + this.name + "," + this.age + "," + this.score + "," + this.sex);
            }
            console.log("-------------------------3、创建MaleStudent实例------------------------")

            var maleStudent1 = new MaleStudent("小刚", 11, 111);
            maleStudent1.say();
            var maleStudent2 = new MaleStudent("小红", 22, 222);
            maleStudent2.sex = "女同学";
            maleStudent2.say();
            var maleStudent3 = new MaleStudent("小粉", 33, 333);
            maleStudent3.sex = "女同学";
            maleStudent3.say();
            console.log("-------------------------4、更改MaleStudent原型的参数？？？-------------------")

            console.log(maleStudent1.__proto__ === MaleStudent.prototype);//true
            console.log(maleStudent1.__proto__ === maleStudent2.__proto__);//true
            console.log(maleStudent1.__proto__.constructor === MaleStudent.prototype.constructor);//MateStudent
            console.log("-------test01(new MaleStudent)--------")
            console.log("maleStudent1原型对象的构造函数为：" + maleStudent1.__proto__.constructor);//MaleStudent
            console.log("MaleStudent的构造函数为：" + MaleStudent.prototype.constructor);//MaleStudent

            console.log("-------test02(new Student)--------")
            console.log("maleStudent1原型对象链的构造函数为：" + maleStudent1.__proto__.__proto__.constructor);//Student
            console.log("Student的构造函数为：" + Student.prototype.constructor);//Student

            console.log("-------test03(new Person)--------")
            console.log("maleStudent1原型对象链2的构造函数为：" + maleStudent1.__proto__.__proto__.__proto__.constructor);
            console.log("Person的构造函数为：" + Person.prototype.constructor);//Person

            console.log("-------<<test04(改变MaleStudent.prototype.sex属性的值)>>--------")

            console.log("MaleStudent的原型对象\"Student\"原本为：" + MaleStudent.prototype.sex);//即Student：男生或女生
            var mateStudent111 = new MaleStudent("ii", 11, 111);
            mateStudent111.__proto__.sex = "没女生";//Student发生改变
            console.log(mateStudent111);
            var maleStudent222 = new Student("hh", 22, 222);
            console.log(maleStudent222);//Student：男生或女生,依然是原先的

            console.log("-------test05(再次测试)--------")
            console.log("\"Student\"的性别标记为：" + MaleStudent.prototype.sex);//Student：没有女同学。----------成功改变。
            console.log("\"Student\"的构造函数性别标记为：" + maleStudent222.__proto__.__proto__.constructor);//Student：没有女同学。----------成功改变。
        }
    }
}
