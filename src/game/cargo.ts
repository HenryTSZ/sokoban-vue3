import { Position } from './position'

export interface Cargo extends Position {}

let _cargos: Cargo[] = []

export const getCargos = (): Cargo[] => _cargos

export const initCargos = (cargos: Cargo[]): void => {
  _cargos = cargos
}

export const getCargoByPosition = (position: Position): Cargo | undefined => {
  return _cargos.find(cargo => cargo.x === position.x && cargo.y === position.y)
}
