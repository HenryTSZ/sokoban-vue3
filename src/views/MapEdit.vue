<template>
  <div>
    <div class="input-row">
      <span class="input-row-label">row:</span>
      <input type="number" v-model="row" />
    </div>
    <div class="input-col">
      <span class="input-col-label">col:</span>
      <input type="number" v-model="col" />
    </div>
    <div class="block-row" v-for="i in row">
      <div class="block-col" v-for="j in col">
        <div class="block">1</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const row = ref(5)
const col = ref(5)
</script>

<style scoped>
.input-row,
.input-col {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
.input-row-label,
.input-col-label {
  width: 35px;
  text-align: right;
  margin-right: 5px;
}

.block-row {
  display: flex;
}
.block {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  margin: 2px;
}
</style>
