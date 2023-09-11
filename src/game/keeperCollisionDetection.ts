import { Keeper } from './keeper'
import { Element } from './map'

export const wallCollisionLeft = (keeper: Keeper, map: Element[][]) => {
  const nextLeftPosition = keeper.x - 1

  const element = map[keeper.y][nextLeftPosition]

  return element.name === 'Wall'
}
