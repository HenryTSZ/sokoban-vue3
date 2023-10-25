<template>
  <img
    class="map-img cargo"
    :src="cargo.onTargetPoint ? cargoOnTarget : cargoImg"
    v-for="cargo in cargos"
    :style="usePosition(cargo).value" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import cargoImg from '../assets/cargo.png'
import cargoOnTarget from '../assets/cargo_on_target.png'
import { Cargo, setupCargos } from '../game'
import { usePosition } from '../composables/position'

const cargos: Cargo[] = reactive([])
setupCargos(cargos)
</script>

<style scoped>
.cargo {
  position: absolute;
}
</style>
