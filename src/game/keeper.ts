import { Position } from './position'
import { Direction, fighting } from './fighting'

export interface Keeper extends Position {}

let _keeper: Keeper = {} as Keeper

export const getKeeper = () => _keeper

export const setupKeeper = (keeper: Keeper) => {
  _keeper = keeper
}

export const initKeeper = (keeper: Keeper) => {
  _keeper.x = keeper.x
  _keeper.y = keeper.y
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
