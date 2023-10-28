import { Position } from './position'
import { getElementByPosition } from './map'
import { getCargoByPosition } from './cargo'

export const collisionWall = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Wall'
}

export const collisionTarget = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Target'
}

export const collisionCargo = (position: Position) => {
  return !!getCargoByPosition(position)
}
