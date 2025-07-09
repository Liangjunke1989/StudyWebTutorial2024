<script setup>
import {ref, reactive, computed} from 'vue'

const a=ref(100);
// 计算属性
const num1=computed(()=>{
  return a.value+200;  // a.value
})
//计算打勾的个数
const color=reactive([
  {name:'张三0',checked:true},
  {name:'张三1',checked:false},
  {name:'张三2',checked:true},
  {name:'张三3',checked:false},
  {name:'张三4',checked:true},
])
const city=reactive([
  {name:'上海0',checked:true},
  {name:'上海1',checked:false},
  {name:'上海2',checked:true},
  {name:'上海3',checked:false},
  {name:'上海4',checked:true},
])
const tagData=reactive( [
    {name:'生活',id:1,checked:true },
    {name:'工作',id:2,checked:false},
    {name:'学习',id:3,checked:true},
    {name:'游戏',id:4,checked:false},
    {name:'旅游',id:5,checked:false},
    {name:'美食',id:6,checked:false},
    {name:'电影',id:7,checked:false},
    {name:'音乐',id:8,checked:false},
    {name:'其他',id:9,checked:false},
])
//reactive与ref的区别?
//  reactive:对象
//  ref:基本数据类型
//  ref 可以重新赋值，reactive不能重新赋值
//  解构后都会失去响应式
/*

 */
//使用ref的写法
const aa = ref("张三")
console.log(aa.value) // 获取值
//使用reactive的写法
const bb=reactive({name:"张三"})
console.log(bb.name)
//计算属性
const num2=computed(()=>{
  return color.filter(item=>item.checked).length;
})
//计算属性传参,属性不能传参，变更为方法的技巧！！！
const ljk_computed= computed(
    ()=>{
      return (data)=>{
        return data.filter(item=>item.checked).length; //有返回值的lambda表达式
      };//有参数的lambda表达式
    }//匿名函数
)//计算属性
//计算属性传参
const num3=computed(()=>data=>data.filter(item=>item.checked).length)

//添加标签
let tags= ref([]);

function addTag(tag) {
  //去重操作
  let r=tags.value.filter(item=>tag.id===item.id)
  if (r.length>0){
    alert('标签已存在')
    return;
  }
  //添加
  tags.value.push(tag)
}
</script>

<template>

  <div class="title">
    <input type="text" v-model="a">
    <h1>{{num1}}</h1>
  </div>

  <div class="context01">
    <h1>选中的颜色的数量为：{{num3(color)}}</h1>
    <ul>
      <li v-for="(v,i) in color" :key="i">
        <input type="checkbox" v-model="v.checked">
        <span>{{v.name}}</span>
      </li>
    </ul>
  </div>

  <div class="context02">
    <h1>选中的城市的数量为：{{ ljk_computed(city) }}</h1>
    <ul>
      <li v-for="(v,i) in city" :key="i">
        <input type="checkbox" v-model="v.checked">
        <span>{{v.name}}</span>
      </li>
    </ul>
  </div>

  <div class="context03">
    <h1>选中的标签为：{{tags}}</h1>
    <ul>
      <li :class="{'selected':v.flag}" v-for="v in tagData" :key="v.id" @click="addTag(v)">
        <span>{{v.name}}</span>
<!--        <input type="checkbox" v-model="v.checked"></input>-->
<!--        <button @click="removeTag(v)">删除</button>-->
      </li>
    </ul>
  </div>


</template>









<style scoped>
h1{
  color: black;
}
.title{
  text-align: center;
  margin-top: 50px;
}
.context01{
  text-align: left;
  margin-top: 50px;
  margin-left: 50px;
}
.context02{
  text-align: left;
  margin-top: 50px;
  margin-left: 50px;
}
.context03{
  text-align: left;
  margin-top: 50px;
}

.setting-selector{
  margin-left: 50px;
  margin-top: 50px;
  width: 500px;
}


</style>
