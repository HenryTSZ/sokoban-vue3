import { Position } from './position'
import { getElementByPosition } from './map'
import { getCargoByPosition } from './cargo'

export const wallCollision = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Wall'
}

export const targetCollision = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Target'
}

export const cargoCollision = (position: Position) => {
  return !!getCargoByPosition(position)
}
