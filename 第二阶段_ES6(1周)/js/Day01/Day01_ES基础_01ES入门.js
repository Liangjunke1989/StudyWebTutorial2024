const obj = {
    m: new Map(),
    add(key, value) {
        this.m.set(key, value)
    },
    fnChooser: name => document.querySelector(name),
    messageList: function () {
        let str = '';
        for (let [k, v] of this.m) {
            //模板字符串
            str += `<li class="list-group-item">${k}
                        <span>说：</span>${v}
                    </li>`
        }
        this.fnChooser('.messageList').innerHTML = str;
    }
}
window.onload = function () {
    console.log("--------------------01、ES入门------------------------------")
    {
        obj.fnChooser(".submit").onclick = () => {
            // var test= 'key' , value='value';
            //01、获取用户输入
            // var name= obj.fnChooser(".name").value,
            //     message=obj.fnChooser(".message").value;

            //02、数组解构
            let [name,message]=[obj.fnChooser(".name").value,
                obj.fnChooser(".message").value];//数组解构
            //03、数据存储
            obj.add(name,message);
            //04、数据展示
            obj.messageList();
        }


    }
}
