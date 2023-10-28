import { beforeEach, describe, expect, it } from 'vitest'
import { initMap } from '../map'
import { getKeeper, initKeeper } from '../keeper'
import { Direction, move } from '../move'
import { getCargos, initCargos } from '../cargo'
import { getGame, initGame } from '../game'

describe('fighting', () => {
  beforeEach(() => {
    initMap([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1]
    ])
    initGame({
      isWin: false,
      level: 1,
      loaded: true
    })
  })

  describe('move left', () => {
    it('should move to left when next is not wall', () => {
      initKeeper({ x: 2, y: 1 })
      move(Direction.Left)
      expect(getKeeper().x).toBe(1)
    })
    it('should not move to left when next is wall', () => {
      initKeeper({ x: 1, y: 1 })
      move(Direction.Left)
      expect(getKeeper().x).toBe(1)
    })
    it('should move cargo to left when next position is cargo', () => {
      initKeeper({ x: 3, y: 1 })
      initCargos([{ x: 2, y: 1 }])
      move(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to left when next position is wall', () => {
      initKeeper({ x: 2, y: 1 })
      initCargos([{ x: 1, y: 1 }])
      move(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to left when next position is cargo', () => {
      initKeeper({ x: 3, y: 1 })
      initCargos([
        { x: 2, y: 1 },
        { x: 1, y: 1 }
      ])
      move(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(2)
      expect(getKeeper().x).toBe(3)
    })
    it('should on target place point when hit target', () => {
      initMap([[1, 3, 2, 2, 1]])
      initKeeper({ x: 3, y: 0 })
      initCargos([{ x: 2, y: 0 }])
      move(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.onTargetPoint).toBe(true)
    })
  })

  describe('move right', () => {
    it('should move to right when next is not wall', () => {
      initKeeper({ x: 1, y: 1 })
      move(Direction.Right)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move to right when next is wall', () => {
      initKeeper({ x: 3, y: 1 })
      move(Direction.Right)
      expect(getKeeper().x).toBe(3)
    })
    it('should move cargo to right when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([{ x: 2, y: 1 }])
      move(Direction.Right)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(3)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to right when next position is wall', () => {
      initKeeper({ x: 2, y: 1 })
      initCargos([{ x: 3, y: 1 }])
      move(Direction.Right)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(3)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to right when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([
        { x: 2, y: 1 },
        { x: 3, y: 1 }
      ])
      move(Direction.Right)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(2)
      expect(getKeeper().x).toBe(1)
    })
  })

  describe('move up', () => {
    it('should move up when next is not wall', () => {
      initKeeper({ x: 1, y: 2 })
      move(Direction.Up)
      expect(getKeeper().y).toBe(1)
    })
    it('should not move up when next is wall', () => {
      initKeeper({ x: 1, y: 1 })
      move(Direction.Up)
      expect(getKeeper().y).toBe(1)
    })
    it('should move cargo to up when next position is cargo', () => {
      initKeeper({ x: 1, y: 3 })
      initCargos([{ x: 1, y: 2 }])
      move(Direction.Up)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(1)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to up when next position is wall', () => {
      initKeeper({ x: 1, y: 2 })
      initCargos([{ x: 1, y: 1 }])
      move(Direction.Up)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(1)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to up when next position is cargo', () => {
      initKeeper({ x: 1, y: 3 })
      initCargos([
        { x: 1, y: 2 },
        { x: 1, y: 1 }
      ])
      move(Direction.Up)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(2)
      expect(getKeeper().y).toBe(3)
    })
  })

  describe('move down', () => {
    it('should move down when next is not wall', () => {
      initKeeper({ x: 1, y: 1 })
      move(Direction.Down)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move down when next is wall', () => {
      initKeeper({ x: 1, y: 3 })
      move(Direction.Down)
      expect(getKeeper().y).toBe(3)
    })
    it('should move cargo to down when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([{ x: 1, y: 2 }])
      move(Direction.Down)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(3)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to down when next position is wall', () => {
      initKeeper({ x: 1, y: 2 })
      initCargos([{ x: 1, y: 3 }])
      move(Direction.Down)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(3)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to down when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([
        { x: 1, y: 2 },
        { x: 1, y: 3 }
      ])
      move(Direction.Down)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(2)
      expect(getKeeper().y).toBe(1)
    })
  })

  describe('game statue', () => {
    it('should game win when all cargo hit all target', () => {
      initMap([[1, 2, 2, 3, 1]])
      initKeeper({ x: 1, y: 0 })
      initCargos([{ x: 2, y: 0 }])
      move(Direction.Right)
      const game = getGame()
      expect(game.isWin).toBe(true)
    })
  })
})
