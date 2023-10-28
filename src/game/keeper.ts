import { Position } from './position'
import { Direction, move } from './move'

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
  move(Direction.Left)
}

export const moveRight = () => {
  move(Direction.Right)
}

export const moveUp = () => {
  move(Direction.Up)
}

export const moveDown = () => {
  move(Direction.Down)
}
