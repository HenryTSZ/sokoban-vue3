import { targetCollision } from './keeperCollisionDetection'
import { Position } from './position'

export interface Cargo extends Position {
  onTargetPoint?: boolean
}

let _cargos: Cargo[] = []

export const getCargos = (): Cargo[] => _cargos

export const initCargos = (cargos: Cargo[]): void => {
  _cargos = cargos
}

export const getCargoByPosition = (position: Position): Cargo | undefined => {
  return _cargos.find(cargo => cargo.x === position.x && cargo.y === position.y)
}

export const isAllCargoOnTarget = (): boolean => {
  return _cargos.every(cargo => cargo.onTargetPoint)
}

export const handleHitTargetPoint = (cargo: Cargo): void => {
  cargo.onTargetPoint = targetCollision(cargo)
}
