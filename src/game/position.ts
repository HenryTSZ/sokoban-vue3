export interface Position {
  x: number
  y: number
}

export const calcLeftPosition = (position: Position) => ({
  x: position.x - 1,
  y: position.y
})
