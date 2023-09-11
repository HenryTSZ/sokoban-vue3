import { Position } from '../composables/position'
import { wallCollisionLeft } from './keeperCollisionDetection'
import { getMap } from './map'

export interface Keeper extends Position {}

let _keeper: Keeper

export const getKeeper = () => _keeper

export const initKeeper = (keeper: Keeper) => {
  _keeper = keeper
}

export const moveLeft = () => {
  if (wallCollisionLeft(_keeper, getMap().map)) {
    return
  }
  _keeper.x--
}
