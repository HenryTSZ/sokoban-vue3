<template>
  <img class="map-img keeper" :src="keeperSrc" :style="positionStyle" />
</template>

<script setup lang="ts">
import { ComputedRef, onMounted, onUnmounted, reactive, watchEffect } from 'vue'
import keeperSrc from '../assets/keeper.png'
import { type Keeper, initKeeper, moveLeft, moveRight, moveUp, moveDown } from '../game/keeper'
import { usePosition } from '../composables/position'
import { gameDatas } from '../game/gameData'
import { getGame } from '../game/game'

let keeper: Keeper = reactive({} as Keeper)
let positionStyle: ComputedRef<string>

watchEffect(() => {
  const keeperData = gameDatas[getGame().level].keeper
  keeper.x = keeperData.x
  keeper.y = keeperData.y
  initKeeper(keeper)

  positionStyle = usePosition(keeper)
})

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
