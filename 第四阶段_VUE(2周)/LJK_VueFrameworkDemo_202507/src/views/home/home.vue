<script setup>
import { ref, onMounted } from 'vue'
import { Home } from './home.js'

const homeInstance = ref(null)
const homeName = ref('')

onMounted(() => {
  homeInstance.value = new Home()
  homeName.value = homeInstance.value.name
})
</script>

<template>
  <div>
    <h1>欢迎来到 {{ homeName }}</h1>
    <p>这是一个Vue 3项目的首页</p>
  </div>
</template>

<style scoped>
h1 {
  color: #42b883;
  text-align: center;
  margin: 2rem 0;
}

p {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
