export class Empty {
  public name = 'Empty'
}

export class Wall {
  public name = 'Wall'
}

export class Floor {
  public name = 'Floor'
}

export class Target {
  public name = 'Target'
}

export type Element = Empty | Wall | Floor | Target

export type Map = Element[][]

let _map: Map = []
export function setupMap(map: Map) {
  _map = map
}

export const initMap = (rowMap: number[][]) => {
  _map.length = 0
  for (let i = 0; i < rowMap.length; i++) {
    const row = []
    for (let j = 0; j < rowMap[i].length; j++) {
      switch (rowMap[i][j]) {
        case 0:
          row.push(new Empty())
          break
        case 1:
          row.push(new Wall())
          break
        case 2:
          row.push(new Floor())
          break
        case 3:
          row.push(new Target())
          break
      }
    }
    _map.push(row)
  }
  return _map
}

export const getMap = () => _map

export const getElementByPosition = (x: number, y: number) => {
  return _map[y][x]
}
