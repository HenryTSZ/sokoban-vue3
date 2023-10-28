import {
  Position,
  calcDownPosition,
  calcLeftPosition,
  calcRightPosition,
  calcUpPosition
} from './position'
import { getCargoByPosition, handleHitTargetPoint } from './cargo'
import { collisionCargo, collisionWall } from './collisionDetection'
import { getKeeper } from './keeper'
import { judgeGameWin } from './game'

export enum Direction {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down'
}

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

export const move = (direction: Direction) => {
  const { calcPosition, directionName, directionValue } = map[direction]
  const keeper = getKeeper()

  const position = calcPosition(keeper)
  if (collisionWall(position)) {
    return
  }
  const cargo = getCargoByPosition(position)
  if (cargo) {
    if (collisionWall(calcPosition(cargo))) {
      return
    }
    if (collisionCargo(calcPosition(cargo))) {
      return
    }
    cargo[directionName] += directionValue

    handleHitTargetPoint(cargo)

    judgeGameWin()
  }
  keeper[directionName] += directionValue
}
