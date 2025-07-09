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
</script>

<template>

  <div title="a">
    <h1>{{num1}}</h1>
    <input type="text" v-model="a">
  </div>

  <div title="b">
    <h1>选中的数量为：{{num2}}</h1>
    <ul>
      <li v-for="(v,i) in color" :key="i">
        <input type="checkbox" v-model="v.checked">
        <span>{{v.name}}</span>
      </li>
    </ul>
  </div>
  <div title="c">
    <h1>选中的数量为：{{num3}}</h1>
    <ul>
      <li v-for="(v,i) in color" :key="i">
        <input type="checkbox" v-model="v.checked">
        <span>{{v.name}}</span>
      </li>
    </ul>
  </div>


</template>

<style scoped>

</style>
