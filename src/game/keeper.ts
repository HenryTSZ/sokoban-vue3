import { Position } from '../composables/position'
import {
  wallCollisionDown,
  wallCollisionLeft,
  wallCollisionRight,
  wallCollisionUp
} from './keeperCollisionDetection'

export interface Keeper extends Position {}

let _keeper: Keeper

export const getKeeper = () => _keeper

export const initKeeper = (keeper: Keeper) => {
  _keeper = keeper
}

export const moveLeft = () => {
  if (wallCollisionLeft(_keeper)) {
    return
  }
  _keeper.x--
}

export const moveRight = () => {
  if (wallCollisionRight(_keeper)) {
    return
  }
  _keeper.x++
}

export const moveUp = () => {
  if (wallCollisionUp(_keeper)) {
    return
  }
  _keeper.y--
}

export const moveDown = () => {
  if (wallCollisionDown(_keeper)) {
    return
  }
  _keeper.y++
}
