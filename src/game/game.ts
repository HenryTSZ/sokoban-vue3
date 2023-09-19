import { isAllCargoOnTarget } from './cargo'

export interface Game {
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
