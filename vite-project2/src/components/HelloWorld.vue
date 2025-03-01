<script setup>
import {reactive, ref} from 'vue'

defineProps({
  msg: String,
})

const count = ref(0);
let count2= ref(100);//定义响应式数据
let count3= reactive({id:1000,title:'title1'});//定义响应式数据
function change2() {
  count2.value++;
  console.log(count2);
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="change2">count2 is {{ count2 }}</button>
    <button type="button" @click="count3.id++">count3 is {{ count3.id }}, title为：{{ count3.title }}</button>
    <p>
      Test
      <br>
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

<!--  <p>-->
<!--    Check out-->
<!--    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"-->
<!--      >create-vue</a-->
<!--    >, the official Vue + Vite starter-->
<!--  </p>-->
<!--  <p>-->
<!--    Learn more about IDE Support for Vue in the-->
<!--    <a-->
<!--      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"-->
<!--      target="_blank"-->
<!--      >Vue Docs Scaling up Guide</a-->
<!--    >.-->
<!--  </p>-->
<!--  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>-->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
