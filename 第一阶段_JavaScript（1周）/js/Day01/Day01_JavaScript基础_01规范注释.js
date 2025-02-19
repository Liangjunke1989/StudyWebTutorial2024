window.onload = function () {
    /**
     * 我的javascript应用程序
     *
     * @module myapp
     */
        //使用命名空间来定义一个空对象
    var MYAPP = {};
    //定义一个包含两个方法(sum()和multi())的math_stuff对象
    /**
     * @namespace MYAPP
     * class math_stuff
     */
    MYAPP.math_stuff = {
        /**
         * Sums two numbers
         *
         * @method sum
         * param     {Number}   是第一个数
         * param     {Number}   是第二个数
         * return   {Number}   两个输入的总和
         */
        sum: function (a, b) {
            return a + b;
        },
        /**
         * Multiplies two numbers
         * param     {Number}   是第一个数
         * param     {Number}   是第二个数
         * return   {Number}   两个输入相乘后结果
         */
        multi: function (a, b) {
            return a * b;
        }
    };


}



