import { Position } from '../game/position'
import { computed } from 'vue'

const STEP = 32

export const usePosition = (position: Position) => {
  const top = computed(() => position.y * STEP)
  const left = computed(() => position.x * STEP)
  return computed(() => `top: ${top.value}px; left: ${left.value}px;`)
}
