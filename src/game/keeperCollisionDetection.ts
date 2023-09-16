import { Position } from './position'
import { getElementByPosition } from './map'

export const wallCollision = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Wall'
}
