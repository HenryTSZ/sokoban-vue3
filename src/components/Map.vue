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
import { Element, initMap } from '../game/map'
import { watchEffect, type Component, reactive } from 'vue'
import { gameDatas } from '../game/gameData'
import { getGame } from '../game/game'

// 0. 空白
// 1. 墙
// 2. 地板
// 3. 放置点

let map: Element[][] = reactive([])

watchEffect(() => {
  map.length = 0
  initMap(gameDatas[getGame().level].map).forEach((row, index) => {
    map[index] = row
  })
  console.log('🚀 ~ file: Map.vue:30 ~ watchEffect ~ map:', map)
})

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
