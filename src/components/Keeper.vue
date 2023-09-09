<template>
  <img class="map-img keeper" :src="keeper" />
</template>

<script setup lang="ts">
import keeper from '../assets/keeper.png'
</script>

<style scoped>
.keeper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
