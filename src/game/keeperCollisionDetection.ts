import { Keeper } from './keeper'
import { getElementByPosition } from './map'

export const wallCollisionLeft = (keeper: Keeper) => {
  return getElementByPosition(keeper.x - 1, keeper.y).name === 'Wall'
}

export const wallCollisionRight = (keeper: Keeper) => {
  return getElementByPosition(keeper.x + 1, keeper.y).name === 'Wall'
}

export const wallCollisionUp = (keeper: Keeper) => {
  return getElementByPosition(keeper.x, keeper.y - 1).name === 'Wall'
}

export const wallCollisionDown = (keeper: Keeper) => {
  return getElementByPosition(keeper.x, keeper.y + 1).name === 'Wall'
}
