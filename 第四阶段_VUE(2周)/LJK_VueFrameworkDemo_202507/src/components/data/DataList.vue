<template>
  <div class="data-list">
    <div v-for="(item, index) in data" :key="index" class="list-item">
      <slot :item="item" :index="index">
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataList',
  props: {
    data: Array
  }
}
</script>

<style scoped>
.data-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
</style> 