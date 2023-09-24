<template>
  <img
    class="map-img cargo"
    :src="cargo.onTargetPoint ? cargoOnTarget : cargoImg"
    v-for="(cargo, index) in cargos"
    :style="positionStyles[index].value" />
</template>

<script setup lang="ts">
import { ComputedRef, reactive, watchEffect } from 'vue'
import cargoImg from '../assets/cargo.png'
import cargoOnTarget from '../assets/cargo_on_target.png'
import { Cargo, initCargos } from '../game/cargo'
import { usePosition } from '../composables/position'
import { gameDatas } from '../game/gameData'
import { getGame } from '../game/game'

let cargos: Cargo[] = reactive([])
let positionStyles: ComputedRef<string>[]

watchEffect(() => {
  cargos.length = 0
  gameDatas[getGame().level].cargos.forEach(cargo => {
    cargos.push(cargo)
  })
  initCargos(cargos)

  positionStyles = cargos.map(cargo => usePosition(cargo))
})
</script>

<style scoped>
.cargo {
  position: absolute;
}
</style>
