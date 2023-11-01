import { createRouter, createWebHashHistory } from 'vue-router'
import Game from '../views/Game.vue'
import MapEdit from '../views/MapEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game
  },
  {
    path: '/mapEdit',
    name: 'MapEdit',
    component: MapEdit
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
