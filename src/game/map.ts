export class Empty {
  public name = 'Empty'
}

export class Wall {
  public name = 'Wall'
}

export class Floor {
  public name = 'Floor'
}

export type Element = Empty | Wall | Floor

let _rowMap: number[][]
let _map: Element[][]

export const initMap = (rowMap: number[][]) => {
  _rowMap = rowMap
  const map = []
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
      }
    }
    map.push(row)
  }
  _map = map
  return map
}

export const getMap = () => ({ map: _map, rowMap: _rowMap })
