import { describe, expect, it } from 'vitest'
import { Keeper } from '../keeper'

describe('Keeper', () => {
  it('should move to left', () => {
    // 初始化玩家位置
    const keeper = new Keeper(1, 0)
    // 向左移动
    keeper.moveLeft()
    // 测试玩家位置是否正确
    expect(keeper.x).toBe(0)
  })
})
