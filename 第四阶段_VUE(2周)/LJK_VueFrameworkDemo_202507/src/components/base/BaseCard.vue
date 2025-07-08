<template>
  <div class="base-card" :class="cardClasses">
    <div v-if="showHeader" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
      <div v-if="$slots.extra" class="card-extra">
        <slot name="extra"></slot>
      </div>
    </div>
    
    <div class="card-body" :style="bodyStyle">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: true
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default', 'large'].includes(value)
    },
    bodyPadding: {
      type: [String, Number],
      default: null
    }
  },
  setup(props, { slots }) {
    const showHeader = computed(() => {
      return props.title || slots.header || slots.extra
    })

    const cardClasses = computed(() => {
      return [
        'base-card',
        {
          'card-bordered': props.bordered,
          'card-hoverable': props.hoverable,
          'card-loading': props.loading,
          [`card-${props.size}`]: props.size !== 'default'
        }
      ]
    })

    const bodyStyle = computed(() => {
      if (props.bodyPadding !== null) {
        const padding = typeof props.bodyPadding === 'number' 
          ? `${props.bodyPadding}px` 
          : props.bodyPadding
        return { padding }
      }
      return {}
    })

    return {
      showHeader,
      cardClasses,
      bodyStyle
    }
  }
}
</script>

<style scoped>
.base-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-bordered {
  border: 1px solid var(--border-color);
}

.card-hoverable:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-loading {
  position: relative;
  overflow: hidden;
}

.card-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: loading 1.5s infinite;
  z-index: 1;
}

.card-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.card-extra {
  color: var(--text-color-secondary);
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-color-light);
}

.card-small .card-header,
.card-small .card-body,
.card-small .card-footer {
  padding: 12px;
}

.card-large .card-header,
.card-large .card-body,
.card-large .card-footer {
  padding: 24px;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style> 