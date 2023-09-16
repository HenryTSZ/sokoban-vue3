export interface Position {
  x: number
  y: number
}

export const calcLeftPosition = (position: Position) => ({
  x: position.x - 1,
  y: position.y
})

export const calcRightPosition = (position: Position) => ({
  x: position.x + 1,
  y: position.y
})

export const calcUpPosition = (position: Position) => ({
  x: position.x,
  y: position.y - 1
})

export const calcDownPosition = (position: Position) => ({
  x: position.x,
  y: position.y + 1
})
