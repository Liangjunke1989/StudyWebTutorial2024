<template>
  <div class="data-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'DataChart',
  props: {
    data: Array,
    type: String
  }
}
</script>

<style scoped>
.data-chart {
  width: 100%;
  height: 300px;
}
</style> 