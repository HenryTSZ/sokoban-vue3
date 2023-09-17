import { Position } from './position'
import { getElementByPosition } from './map'
import { getCargoByPosition } from './cargo'

export const wallCollision = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Wall'
}

export const cargoCollision = (position: Position) => {
  return !!getCargoByPosition(position)
}
