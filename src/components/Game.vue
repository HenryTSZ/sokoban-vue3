<template>
  <div class="container">
    <Map />
    <Keeper />
  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue'
import Keeper from './Keeper.vue'
</script>

<style scoped>
.container {
  position: relative;
}
</style>
