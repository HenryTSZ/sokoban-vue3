<template>
  <div class="container">
    <Map />
    <Keeper />
    <Cargo />
    <div v-if="game.isWin">
      恭喜你,你已经通关了! <button @click="handleNextLevel">下一关</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue'
import Keeper from './Keeper.vue'
import Cargo from './Cargo.vue'
import { reactive } from 'vue'
import { initGame } from '../game/game'

const game = reactive({
  isWin: false,
  level: 0
})
initGame(game)

const handleNextLevel = () => {
  game.level++
  game.isWin = false
}
</script>

<style scoped>
.container {
  position: relative;
}
</style>
