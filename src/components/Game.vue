<template>
  <div class="container">
    <Map />
    <Keeper />
    <Cargo />
    <div v-if="game.isWin">恭喜你,你已经通关了!</div>
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
  level: 1
})
initGame(game)
</script>

<style scoped>
.container {
  position: relative;
}
</style>
