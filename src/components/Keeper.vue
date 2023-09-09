<template>
  <img
    class="map-img keeper"
    :src="keeperSrc"
    :style="{ top: `${keeper.y * 32}px`, left: `${keeper.x * 32}px` }" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import keeperSrc from '../assets/keeper.png'
import { Keeper } from '../game/keeper'

let keeper = new Keeper(5, 1)
keeper = reactive(keeper)

function handleKeyup(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowLeft':
    case 'KeyH':
      keeper.moveLeft()
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
