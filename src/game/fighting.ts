import {
  Position,
  calcDownPosition,
  calcLeftPosition,
  calcRightPosition,
  calcUpPosition
} from './position'
import { getCargoByPosition } from './cargo'
import { wallCollision } from './keeperCollisionDetection'
import { getKeeper } from './keeper'

export enum Direction {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down'
}

export const fighting = (direction: Direction) => {
  const map: Record<
    Direction,
    {
      calcPosition: (position: Position) => Position
      directionName: 'x' | 'y'
      directionValue: 1 | -1
    }
  > = {
    left: { calcPosition: calcLeftPosition, directionName: 'x', directionValue: -1 },
    right: { calcPosition: calcRightPosition, directionName: 'x', directionValue: 1 },
    up: { calcPosition: calcUpPosition, directionName: 'y', directionValue: -1 },
    down: { calcPosition: calcDownPosition, directionName: 'y', directionValue: 1 }
  }

  const { calcPosition, directionName, directionValue } = map[direction]
  const keeper = getKeeper()

  const position = calcPosition(keeper)
  if (wallCollision(position)) {
    return
  }
  const cargo = getCargoByPosition(position)
  if (cargo) {
    if (wallCollision(calcPosition(cargo))) {
      return
    }
    cargo[directionName] += directionValue
  }
  keeper[directionName] += directionValue
}
