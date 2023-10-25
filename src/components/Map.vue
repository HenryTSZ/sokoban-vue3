<template>
  <div class="map">
    <div class="row" v-for="row in map">
      <div class="col" v-for="col in row">
        <component :is="componentMap[col.name]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Empty from './Empty.vue'
import Wall from './Wall.vue'
import Floor from './Floor.vue'
import Target from './Target.vue'
import { Element, setupMap } from '../game'
import { type Component, reactive } from 'vue'

const map: Element[][] = reactive([])
setupMap(map)

const componentMap: Record<string, Component> = {
  Empty,
  Wall,
  Floor,
  Target
}
</script>

<style scoped>
.row {
  display: flex;
}
.map-img {
  display: block;
}
</style>
