import { Position } from '../composables/position'

export interface Cargo extends Position {}

let _cargos: Cargo[] = []

export const getCargos = (): Cargo[] => _cargos

export const initCargos = (cargos: Cargo[]): void => {
  _cargos = cargos
}
