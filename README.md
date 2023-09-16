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

## [箱子的碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/647a0520c5c760d5ae97a63292927d7fac684306)

## 完成箱子移动位置

目前我们完成了向左的移动，接下来将剩余三个方向的移动也写一下

### TDD 向右移动

```ts
it('should move cargo to right when next position is cargo', () => {
  // 初始化玩家
  initKeeper({ x: 1, y: 1 })
  // 初始化箱子
  initCargos([{ x: 2, y: 1 }])
  // 向右移动
  moveRight()
  // 测试箱子位置是否正确
  const cargo = getCargos()[0]
  expect(cargo.x).toBe(3)
  // 测试玩家位置是否正确
  expect(getKeeper().x).toBe(2)
})
```

当然这时候测试是不通过的

我们就需要去处理 `moveRight` 的逻辑了

对比 `moveLeft`，发现有几处需要修改的：

1. 增加了 `calcLeftPosition` 和 `wallCollision`
2. 增加了检测箱子的逻辑

所以我们应该先去测试第一处修改

那先把刚才添加的单测跳过

```ts
it.skip('should move cargo to right when next position is cargo', () => {
  // ...
}
```

然后增加 `calcRightPosition` 和 `wallCollision`

```ts
export const calcRightPosition = (position: Position) => ({
  x: position.x + 1,
  y: position.y
})
```

```ts
export const moveRight = () => {
  const position = calcRightPosition(_keeper)
  if (wallCollision(position)) {
    return
  }

  _keeper.x++
}
```

测试通过

注：这块有一个很重要的点：一次性尽量保证只有一个测试是失败的，如果有多个测试失败了，那么就应该先跳过这些，TDD 玩的就是小步走

然后增加检测箱子的逻辑

```ts
export const moveRight = () => {
  const position = calcRightPosition(_keeper)
  if (wallCollision(position)) {
    return
  }
  // 1. 需要获取到 next right position 上的 cargo
  const cargo = getCargoByPosition(position)
  // 2. 改变这个 cargo 的位置
  if (cargo) {
    cargo.x++
  }
  _keeper.x++
}
```

将跳过的单测打开，单测通过了

可以看到我们这里并没有检测箱子和墙的碰撞逻辑，依然是 TDD 的小步走思想，只需要让当前的单测通过即可，不需要考虑别的，这样我们思考的负担也是最小的

然后我们再增加一个和墙碰撞的单测

```ts
it('should not move cargo and keeper to right when next position is wall', () => {
  // 初始化玩家
  initKeeper({ x: 2, y: 1 })
  // 初始化箱子
  initCargos([{ x: 3, y: 1 }])
  // 向右移动
  moveRight()
  // 测试箱子位置是否正确
  const cargo = getCargos()[0]
  expect(cargo.x).toBe(3)
  // 测试玩家位置是否正确
  expect(getKeeper().x).toBe(2)
})
```

然后再补上和墙的碰撞逻辑

```ts
if (cargo) {
  if (wallCollision(calcRightPosition(cargo))) {
    return
  }
  cargo.x++
}
```

测试通过了, 页面也没问题

当然，按照惯例，我们还是给单测分一下组吧

```ts
describe('move left', () => {
  // ...
})
describe('move right', () => {
  // ...
})
```

### TDD 向上/下移动

这里我们发现我们的 `map` 数据空间不够上下移动了，所以需要增加一行

```ts
initMap([
  [1, 1, 1, 1, 1],
  [1, 2, 2, 2, 1],
  [1, 2, 2, 2, 1],
  [1, 2, 2, 2, 1],
  [1, 1, 1, 1, 1]
])
```

可以看到以前的测试都没有问题

那按照刚才向右移动的思路来测试向上/下移动

这里就不再赘述了

写完以后发现 `wallCollisionLeft` / `wallCollisionRight` `wallCollisionUp` / `wallCollisionDown` 都不需要了，那就删除吧
