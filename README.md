# sokoban-vue3

## [初始化项目](https://github.com/HenryTSZ/sokoban-vue3/tree/68b262e0a4772b868b4f4352bf41939f96a6b7ad)

## [创建地图](https://github.com/HenryTSZ/sokoban-vue3/tree/34ea99dbe041f1789aacd3aac3c7ad1f0b987fbd)

## [重构及单测地图](https://github.com/HenryTSZ/sokoban-vue3/tree/14888773c1b9d4c2c9a1f890cf836229dc0a66f7)

## [添加玩家](https://github.com/HenryTSZ/sokoban-vue3/tree/8b487da65560ececa311a5b7be7c3400e99608cf)

## [玩家移动位置](https://github.com/HenryTSZ/sokoban-vue3/tree/9acd676ee8399f2f41e666363a4ddf273c1930c4)

## [碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/76f2289456bfde01ede6f4b0948f8a3a5f78b5a6)

## [重构玩家数据结构](https://github.com/HenryTSZ/sokoban-vue3/tree/63fb1f9bd9915a4450b0b6c89deee6e11be7dd06)

## [完成玩家移动位置](https://github.com/HenryTSZ/sokoban-vue3/tree/3510c6b4f6509e21b5a36742b1527f74f1be9be9)

## [添加箱子](https://github.com/HenryTSZ/sokoban-vue3/tree/5275e5a04d37221b8e324e74aed5f539735c0f4b)

## [玩家推着箱子移动](https://github.com/HenryTSZ/sokoban-vue3/tree/0d342cc8055e080d1380ca282a8974c3b8157b2a)

## 箱子的碰撞检测

当箱子移动的下一个位置是墙的时候，玩家和箱子就不能移动了

### TDD 箱子的碰撞检测

先写单测：

```ts
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
```

测试是没有通过的，那我们就需要实现逻辑了

其实就是调用 `wallCollisionLeft` 函数，不过 `position` 传入的是 `cargo` 的向左的下个位置

```ts
export const moveLeft = () => {
  const position = { x: _keeper.x - 1, y: _keeper.y }
  if (wallCollisionLeft(position)) {
    return
  }
  // 1. 需要获取到 next left position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollisionLeft({ x: cargo.x - 1, y: cargo.y })) {
      return
    }
    cargo.x--
  }
  _keeper.x--
}
```

测试通过，页面也没有问题

### 重构-提取获取 position 的方法

在 `moveLeft` 函数中我们先是对 `keeper` 的 `x` 调整，再对 `cargo` 的 `x` 调整，那我们可以封装一个函数来获取 position

创建一个 `game/position.ts` 文件:

```ts
import { Position } from '../composables/position'

export const calcLeftPosition = (position: Position) => ({
  x: position.x - 1,
  y: position.y
})
```

这里的 `Position` 是我们在 `composables/position.ts` 中定义的类型，但其实应该在 `game/position.ts` 中定义

所以把相关的引用都替换一下

然后在 `moveLeft` 函数中调用这个函数:

```ts
export const moveLeft = () => {
  const position = calcLeftPosition(_keeper)
  if (wallCollisionLeft(position)) {
    return
  }
  // 1. 需要获取到 next left position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollisionLeft(calcLeftPosition(cargo))) {
      return
    }
    cargo.x--
  }
  _keeper.x--
}
```

### 重构-提取 wallCollision 的方法

当初使用 `wallCollisionLeft` 时，是因为内部对传入的 `position` 进行了 `-1` 的操作，而现在这个处理已经在 `moveLeft` 函数中完成了，所以 `wallCollisionLeft` `wallCollisionRight` `wallCollisionUp` `wallCollisionDown` 内部逻辑都一样了，那其实就只需要一个函数就可以了

我们先创建一个新函数：

```ts
export const wallCollision = (position: Position) => {
  return getElementByPosition(position.x, position.y).name === 'Wall'
}
```

然后在 `moveLeft` 函数中替换这个函数:

```ts
export const moveLeft = () => {
  const position = calcLeftPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next left position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    if (wallCollision(calcLeftPosition(cargo))) {
      return
    }
    cargo.x--
  }
  _keeper.x--
}
```

测试通过，页面也没有问题
