<template>
  <div class="container">
    <Map />
    <Keeper />
    <Cargo />
  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue'
import Keeper from './Keeper.vue'
import Cargo from './Cargo.vue'
</script>

<style scoped>
.container {
  position: relative;
}
</style>
