<template>
  <div class="container">
    <button v-if="!game.loaded" @click="() => startGame()">开始游戏</button>
    <Map />
    <Keeper />
    <Cargo />
    <div v-if="game.isWin">
      恭喜你,你已经通关了! <button @click="handleNextLevel">下一关</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from '../components/Map.vue'
import Keeper from '../components/Keeper.vue'
import Cargo from '../components/Cargo.vue'
import { reactive } from 'vue'
import { initGame, handleNextLevel, startGame } from '../game'

const game = reactive({
  loaded: false,
  isWin: false,
  level: 0
})
initGame(game)
</script>

<style scoped>
.container {
  position: relative;
}
</style>
