<template>
  <nav class="breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <router-link v-if="item.path" :to="item.path" class="breadcrumb-link">
          {{ item.title }}
        </router-link>
        <span v-else class="breadcrumb-text">{{ item.title }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    items: Array
  }
}
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 16px;
}

.breadcrumb-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
}

.breadcrumb-text {
  color: var(--text-color-secondary);
}

.breadcrumb-separator {
  margin: 0 8px;
  color: var(--text-color-secondary);
}
</style> 