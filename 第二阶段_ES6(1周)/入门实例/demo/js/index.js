const obj = {
    m:new Map(),
    fnChooser:name=>document.querySelector(name),
    messageList:function(){
        let str = '';
        for(let [k,v] of this.m){  
            //模板字符串
            str += `<li class="list-group-item">${k}
                        <span>说：</span>${v}
                    </li>`
        };
        this.fnChooser('.messageList').innerHTML = str;
    }
}
window.onload = function(){
    obj.fnChooser('.submit').onclick = () =>{
        //获取数据  数组解构
        let [name,message] = [obj.fnChooser('.name').value,obj.fnChooser('.message').value];
        //数据存储   map数据结构
        obj.m.set(name,message);
        //数据展示
        obj.messageList();
    }

}