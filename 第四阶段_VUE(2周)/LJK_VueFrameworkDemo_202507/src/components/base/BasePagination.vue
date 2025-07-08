<template>
  <div class="base-pagination">
    <button 
      class="pagination-btn" 
      :disabled="currentPage === 1"
      @click="handlePrevious"
    >
      上一页
    </button>
    
    <span class="pagination-info">
      第 {{ currentPage }} 页，共 {{ totalPages }} 页
    </span>
    
    <button 
      class="pagination-btn" 
      :disabled="currentPage === totalPages"
      @click="handleNext"
    >
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:currentPage', 'change'],
  setup(props, { emit }) {
    const handlePrevious = () => {
      if (props.currentPage > 1) {
        const newPage = props.currentPage - 1
        emit('update:currentPage', newPage)
        emit('change', newPage)
      }
    }

    const handleNext = () => {
      if (props.currentPage < props.totalPages) {
        const newPage = props.currentPage + 1
        emit('update:currentPage', newPage)
        emit('change', newPage)
      }
    }

    return {
      handlePrevious,
      handleNext
    }
  }
}
</script>

<style scoped>
.base-pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  padding: 16px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background-color: white;
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: var(--text-color-secondary);
  font-size: 14px;
}
</style> 