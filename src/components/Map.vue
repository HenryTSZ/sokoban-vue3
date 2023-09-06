<template>
  <div class="map">
    <div class="row" v-for="row in map">
      <div class="col" v-for="col in row">
        <img class="img" v-if="col === 0" :src="empty" />
        <img class="img" v-else-if="col === 1" :src="wall" />
        <img class="img" v-else-if="col === 2" :src="floor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import wall from '../assets/wall.png'
import floor from '../assets/floor.png'
import empty from '../assets/empty.png'

// 0. 空白
// 1. 墙
// 2. 地板
const map = [
  [0, 0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 2, 2, 2, 1, 0],
  [1, 2, 2, 2, 2, 2, 1, 0]
]
</script>

<style scoped>
.row {
  display: flex;
}
.col .img {
  display: block;
}
</style>
