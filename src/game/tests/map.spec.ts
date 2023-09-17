import { describe, expect, it } from 'vitest'
import { Empty, Floor, Target, Wall, initMap } from '../map'

describe('Map', () => {
  it('should initMap', () => {
    const rowMap = [[0, 1, 2, 3]]
    const map = initMap(rowMap)
    expect(map).toEqual([[new Empty(), new Wall(), new Floor(), new Target()]])
  })
})
