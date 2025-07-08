<template>
  <form class="search-form" @submit.prevent="handleSubmit">
    <div class="search-fields">
      <slot></slot>
    </div>
    
    <div class="search-actions">
      <button type="submit" class="search-btn primary">
        🔍 搜索
      </button>
      <button type="button" class="search-btn secondary" @click="handleReset">
        🔄 重置
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  emits: ['search', 'reset'],
  setup(props, { emit }) {
    const handleSubmit = () => {
      emit('search')
    }
    
    const handleReset = () => {
      emit('reset')
    }
    
    return {
      handleSubmit,
      handleReset
    }
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 16px;
  background-color: var(--bg-color-light);
  border-radius: 8px;
  margin-bottom: 16px;
}

.search-fields {
  flex: 1;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.search-actions {
  display: flex;
  gap: 8px;
}

.search-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.search-btn.primary:hover {
  background-color: var(--primary-hover-color);
}

.search-btn.secondary {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.search-btn.secondary:hover {
  background-color: var(--bg-color-light);
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-actions {
    justify-content: center;
  }
}
</style> 