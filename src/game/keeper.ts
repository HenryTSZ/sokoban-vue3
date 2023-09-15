import { Position, calcLeftPosition } from './position'
import { getCargoByPosition } from './cargo'
import {
  wallCollision,
  wallCollisionDown,
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
  const position = calcLeftPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next left position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollision(calcLeftPosition(cargo))) {
      return
    }
    cargo.x--
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
