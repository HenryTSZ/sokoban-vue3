import { getMap } from './map'

export class Keeper {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  moveLeft() {
    if (getMap().map[this.y][this.x - 1].name === 'Wall') {
      return
    }

    this.x--
  }
}
