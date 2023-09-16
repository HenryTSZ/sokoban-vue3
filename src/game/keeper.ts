import {
  Position,
  calcDownPosition,
  calcLeftPosition,
  calcRightPosition,
  calcUpPosition
} from './position'
import { getCargoByPosition } from './cargo'
import { wallCollision } from './keeperCollisionDetection'

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
  const position = calcRightPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next right position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollision(calcRightPosition(cargo))) {
      return
    }
    cargo.x++
  }
  _keeper.x++
}

export const moveUp = () => {
  const position = calcUpPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next up position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollision(calcUpPosition(cargo))) {
      return
    }
    cargo.y--
  }
  _keeper.y--
}

export const moveDown = () => {
  const position = calcDownPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next down position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollision(calcDownPosition(cargo))) {
      return
    }
    cargo.y++
  }

  _keeper.y++
}
