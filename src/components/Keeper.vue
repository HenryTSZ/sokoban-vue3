<template>
  <img class="map-img keeper" :src="keeperSrc" :style="positionStyle" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import keeperSrc from '../assets/keeper.png'
import { type Keeper, initKeeper, moveLeft, moveRight, moveUp, moveDown } from '../game/keeper'
import { usePosition } from '../composables/position'

const keeper: Keeper = reactive({
  x: 5,
  y: 1
})
initKeeper(keeper)

const positionStyle = usePosition(keeper)
console.log('🚀 ~ file: Keeper.vue:18 ~ positionStyle:', positionStyle)

function handleKeyup(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowLeft':
    case 'KeyH':
      moveLeft()
      break
    case 'ArrowRight':
    case 'KeyL':
      moveRight()
      break
    case 'ArrowUp':
    case 'KeyK':
      moveUp()
      break
    case 'ArrowDown':
    case 'KeyJ':
      moveDown()
      break
    default:
      break
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})
onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<style scoped>
.keeper {
  position: absolute;
}
</style>
