import { initCargos, isAllCargoOnTarget } from './cargo'
import { gameDatas } from './gameData'
import { initKeeper } from './keeper'
import { initMap } from './map'

export interface Game {
  loaded: boolean
  isWin: boolean
  level: number
}

let _game: Game

export const initGame = (game: Game) => {
  _game = game
}

export const getGame = () => {
  return _game
}

export const judgeGameWin = () => {
  _game.isWin = isAllCargoOnTarget()
}

export const handleNextLevel = () => {
  const level = _game.level + 1
  _game.level = level
  _game.isWin = false
  initData()
}

export const startGame = () => {
  _game.loaded = true
  initData()
}

const initData = () => {
  const { map, keeper, cargos } = gameDatas[_game.level]
  initMap(map)
  initKeeper(keeper)
  initCargos(cargos)
}
