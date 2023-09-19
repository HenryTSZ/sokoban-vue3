<template>
  <div class="map">
    <div class="row" v-for="row in map">
      <div class="col" v-for="col in row">
        <component :is="componentMap[col.name]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Empty from './Empty.vue'
import Wall from './Wall.vue'
import Floor from './Floor.vue'
import Target from './Target.vue'
import { initMap } from '../game/map'
import { type Component } from 'vue'

// 0. 空白
// 1. 墙
// 2. 地板
// 3. 放置点
const rowMap = [
  [0, 0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 2, 2, 2, 1, 0],
  [1, 2, 2, 2, 2, 2, 1, 0],
  [1, 1, 1, 3, 2, 2, 1, 0],
  [1, 2, 1, 1, 2, 2, 1, 0],
  [1, 2, 1, 2, 2, 2, 1, 1],
  [1, 2, 2, 3, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
]

const map = initMap(rowMap)

const componentMap: Record<string, Component> = {
  Empty,
  Wall,
  Floor,
  Target
}
</script>

<style scoped>
.row {
  display: flex;
}
.map-img {
  display: block;
}
</style>
