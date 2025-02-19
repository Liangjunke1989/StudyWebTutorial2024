window.onload = function () {
    // 字符串常用的属性和方法
    // charAt() 方法可返回指定位置的字符。
    // concat() 方法用于连接两个或多个字符串。
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
    // lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置
    // includes() 方法用于判断字符串是否包含指定的子字符串
    // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
    // split() 方法用于把一个字符串分割成字符串数组
    // substr() 方法可在字符串中抽取从开始下标开始的指定数目的字符
    // substring() 方法用于提取字符串中介于两个指定下标之间的字符
    // slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分
    // toLowerCase() 方法用于把字符串转换为小写
    // toUpperCase() 方法用于把字符串转换为大写
    // trim() 方法用于删除字符串的头尾空格

    //1、查找位置
    // charAt() 方法可返回指定位置的字符。
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
    // lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置
    // includes() 方法用于判断字符串是否包含指定的子字符串

    //2、截取
    // slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分
    // substr() 方法可在字符串中抽取从开始下标开始的指定数目的字符
    // substring() 方法用于提取字符串中介于两个指定下标之间的字符
    var str = 'hello world';
    var s1 = str.slice(3,-4);//（3，7）

    var s2 = str.substr(1,4);//
    var s3 = str.substring(3,-4); //str.substring(0,3)
    console.log(s1);
    console.log(s2);
    console.log(s3);

    //3、其它
    // split() 方法用于把一个字符串分割成字符串数组
    // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
    // toLowerCase() 方法用于把字符串转换为小写
    // toUpperCase() 方法用于把字符串转换为大写
    // trim() 方法用于删除字符串的头尾空格
}



