import { beforeEach, describe, expect, it } from 'vitest'
import { initKeeper, moveLeft, getKeeper } from '../keeper'
import { initMap } from '../map'

describe('Keeper', () => {
  beforeEach(() => {
    // 初始化地图
    initMap([
      [1, 1, 1, 1],
      [1, 2, 2, 1],
      [1, 2, 2, 1],
      [1, 1, 1, 1]
    ])
  })
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