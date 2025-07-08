<template>
  <nav class="nav-menu">
    <ul class="menu-list">
      <li v-for="item in items" :key="item.key" class="menu-item">
        <router-link :to="item.path" class="menu-link">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    items: Array
  }
}
</script>

<style scoped>
.nav-menu {
  width: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 4px;
}

.menu-link {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.menu-link:hover,
.menu-link.router-link-active {
  background-color: var(--primary-light-color);
  color: var(--primary-color);
}
</style> 