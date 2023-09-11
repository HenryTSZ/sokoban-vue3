<template>
  <img class="map-img keeper" :src="keeperSrc" :style="positionStyle" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import keeperSrc from '../assets/keeper.png'
import { type Keeper, initKeeper, moveLeft } from '../game/keeper'
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
      console.log(keeper)
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
