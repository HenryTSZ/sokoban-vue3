import { Position } from './position'
import { Direction, fighting } from './fighting'

export interface Keeper extends Position {}

let _keeper: Keeper

export const getKeeper = () => _keeper

export const initKeeper = (keeper: Keeper) => {
  _keeper = keeper
}

export const moveLeft = () => {
  fighting(Direction.Left)
}

export const moveRight = () => {
  fighting(Direction.Right)
}

export const moveUp = () => {
  fighting(Direction.Up)
}

export const moveDown = () => {
  fighting(Direction.Down)
}
