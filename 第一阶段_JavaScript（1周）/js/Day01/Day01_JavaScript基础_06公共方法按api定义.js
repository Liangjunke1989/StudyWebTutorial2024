var ljkAPP = {};
/**
 * 解决引用类型深拷贝
 * @name    deepCopy
 * @Module  ljkDeepCopyModule
 * @namespace  ljkAPP
 */
/**
 * @namespace  ljkAPP
 * @name    deepCopy
 * 创建一个新对象，深度复制传入的对象。
 * @param {Object} obj 要进行深度复制的对象。
 * @returns {Object} 一个深度复制了传入对象的新对象。
 */
MYAPP.deepCopy = function (obj) {
    var o = newObj;
    // 遍历obj，将obj的数据逐层复制给newObj
    for (var key in obj) {
        // 判断当前键值是否为引用类型
        if (typeof obj[key] === 'object') {
            // 判断是数组还是对象，以决定新建对象的类型
            o[key] = (obj[key].constructor === Array) ? [] : {};
            // 递归处理，对子对象进行深度复制
            deep(o[key], obj[key]);
        }
        // 针对非引用类型值，直接赋值
        else {
            o[key] = obj[key];
        }
    }
    return o;
}
