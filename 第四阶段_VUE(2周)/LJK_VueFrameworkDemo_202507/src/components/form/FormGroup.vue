<template>
  <div class="form-group" :class="{ error: hasError }">
    <label v-if="label" class="form-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="form-control">
      <slot></slot>
    </div>
    
    <div v-if="hasError" class="form-error">
      {{ errorMessage }}
    </div>
    
    <div v-if="help && !hasError" class="form-help">
      {{ help }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FormGroup',
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    inputId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const hasError = computed(() => !!props.error)
    const errorMessage = computed(() => props.error)
    
    return {
      hasError,
      errorMessage
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

.form-group.error .form-control {
  border-color: var(--error-color);
}

.form-label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: var(--text-color);
  font-size: 14px;
}

.required-mark {
  color: var(--error-color);
  margin-left: 2px;
}

.form-control {
  position: relative;
}

.form-error {
  color: var(--error-color);
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.4;
}

.form-help {
  color: var(--text-color-secondary);
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.4;
}
</style> 