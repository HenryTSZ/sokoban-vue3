import { beforeEach, describe, expect, it } from 'vitest'
import { initMap } from '../map'
import { getKeeper, initKeeper } from '../keeper'
import { Direction, fighting } from '../fighting'
import { getCargos, initCargos } from '../cargo'

describe('fighting', () => {
  beforeEach(() => {
    initMap([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1]
    ])
  })

  describe('move left', () => {
    it('should move to left when next is not wall', () => {
      initKeeper({ x: 2, y: 1 })
      fighting(Direction.Left)
      expect(getKeeper().x).toBe(1)
    })
    it('should not move to left when next is wall', () => {
      initKeeper({ x: 1, y: 1 })
      fighting(Direction.Left)
      expect(getKeeper().x).toBe(1)
    })
    it('should move cargo to left when next position is cargo', () => {
      initKeeper({ x: 3, y: 1 })
      initCargos([{ x: 2, y: 1 }])
      fighting(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to left when next position is wall', () => {
      initKeeper({ x: 2, y: 1 })
      initCargos([{ x: 1, y: 1 }])
      fighting(Direction.Left)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      expect(getKeeper().x).toBe(2)
    })
  })

  describe('move right', () => {
    it('should move to right when next is not wall', () => {
      initKeeper({ x: 1, y: 1 })
      fighting(Direction.Right)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move to right when next is wall', () => {
      initKeeper({ x: 3, y: 1 })
      fighting(Direction.Right)
      expect(getKeeper().x).toBe(3)
    })
    it('should move cargo to right when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([{ x: 2, y: 1 }])
      fighting(Direction.Right)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(3)
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to right when next position is wall', () => {
      initKeeper({ x: 2, y: 1 })
      initCargos([{ x: 3, y: 1 }])
      fighting(Direction.Right)
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(3)
      expect(getKeeper().x).toBe(2)
    })
  })

  describe('move up', () => {
    it('should move up when next is not wall', () => {
      initKeeper({ x: 2, y: 2 })
      fighting(Direction.Up)
      expect(getKeeper().y).toBe(1)
    })
    it('should not move up when next is wall', () => {
      initKeeper({ x: 1, y: 1 })
      fighting(Direction.Up)
      expect(getKeeper().y).toBe(1)
    })
    it('should move cargo to up when next position is cargo', () => {
      initKeeper({ x: 1, y: 3 })
      initCargos([{ x: 1, y: 2 }])
      fighting(Direction.Up)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(1)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to up when next position is wall', () => {
      initKeeper({ x: 1, y: 2 })
      initCargos([{ x: 1, y: 1 }])
      fighting(Direction.Up)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(1)
      expect(getKeeper().y).toBe(2)
    })
  })

  describe('move down', () => {
    it('should move down when next is not wall', () => {
      initKeeper({ x: 1, y: 1 })
      fighting(Direction.Down)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move down when next is wall', () => {
      initKeeper({ x: 1, y: 3 })
      fighting(Direction.Down)
      expect(getKeeper().y).toBe(3)
    })
    it('should move cargo to down when next position is cargo', () => {
      initKeeper({ x: 1, y: 1 })
      initCargos([{ x: 1, y: 2 }])
      fighting(Direction.Down)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(3)
      expect(getKeeper().y).toBe(2)
    })
    it('should not move cargo and keeper to down when next position is wall', () => {
      initKeeper({ x: 1, y: 2 })
      initCargos([{ x: 1, y: 3 }])
      fighting(Direction.Down)
      const cargo = getCargos()[0]
      expect(cargo.y).toBe(3)
      expect(getKeeper().y).toBe(2)
    })
  })
})
