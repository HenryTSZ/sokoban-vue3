<template>
  <img class="map-img cargo" :src="cargo" v-for="style in positionStyles" :style="style.value" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import cargo from '../assets/cargo.png'
import { Cargo, initCargos } from '../game/cargo'
import { usePosition } from '../composables/position'

const cargos: Cargo[] = reactive([
  { x: 4, y: 2 },
  { x: 3, y: 2 }
])
initCargos(cargos)

const positionStyles = cargos.map(cargo => usePosition(cargo))
</script>

<style scoped>
.cargo {
  position: absolute;
}
</style>
