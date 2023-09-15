import { beforeEach, describe, expect, it } from 'vitest'
import { initKeeper, moveLeft, getKeeper, moveRight, moveUp, moveDown } from '../keeper'
import { initMap } from '../map'
import { getCargos, initCargos } from '../cargo'

describe('Keeper', () => {
  describe('move and wall collision', () => {
    beforeEach(() => {
      // 初始化地图
      initMap([
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 1, 1, 1]
      ])
    })

    describe('move left', () => {
      it('should move to left when next is not wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 2, y: 1 })
        // 向左移动
        moveLeft()
        // 测试玩家位置是否正确
        expect(getKeeper().x).toBe(1)
      })
      it('should not move to left when next is wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 1 })
        // 向左移动
        moveLeft()
        // 测试玩家位置是否正确
        expect(getKeeper().x).toBe(1)
      })
    })

    describe('move right', () => {
      it('should move to right when next is not wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 1 })
        // 向右移动
        moveRight()
        // 测试玩家位置是否正确
        expect(getKeeper().x).toBe(2)
      })
      it('should not move to right when next is wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 2, y: 1 })
        // 向右移动
        moveRight()
        // 测试玩家位置是否正确
        expect(getKeeper().x).toBe(2)
      })
    })

    describe('move up', () => {
      it('should move up when next is not wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 2 })
        // 向上移动
        moveUp()
        // 测试玩家位置是否正确
        expect(getKeeper().y).toBe(1)
      })
      it('should not move up when next is wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 1 })
        // 向上移动
        moveUp()
        // 测试玩家位置是否正确
        expect(getKeeper().y).toBe(1)
      })
    })

    describe('move down', () => {
      it('should move down when next is not wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 1 })
        // 向下移动
        moveDown()
        // 测试玩家位置是否正确
        expect(getKeeper().y).toBe(2)
      })
      it('should not move down when next is wall', () => {
        // 初始化玩家位置
        initKeeper({ x: 1, y: 2 })
        // 向下移动
        moveDown()
        // 测试玩家位置是否正确
        expect(getKeeper().y).toBe(2)
      })
    })
  })

  describe('cargo', () => {
    beforeEach(() => {
      initMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1]
      ])
    })
    it('should move cargo to left when next position is cargo', () => {
      // 初始化玩家
      initKeeper({ x: 3, y: 1 })
      // 初始化箱子
      initCargos([{ x: 2, y: 1 }])
      // 向左移动
      moveLeft()
      // 测试箱子位置是否正确
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      // 测试玩家位置是否正确
      expect(getKeeper().x).toBe(2)
    })
    it('should not move cargo and keeper to left when next position is wall', () => {
      // 初始化玩家
      initKeeper({ x: 2, y: 1 })
      // 初始化箱子
      initCargos([{ x: 1, y: 1 }])
      // 向左移动
      moveLeft()
      // 测试箱子位置是否正确
      const cargo = getCargos()[0]
      expect(cargo.x).toBe(1)
      // 测试玩家位置是否正确
      expect(getKeeper().x).toBe(2)
    })
  })
})
