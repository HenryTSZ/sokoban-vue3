# sokoban-vue3

## [初始化项目](https://github.com/HenryTSZ/sokoban-vue3/tree/68b262e0a4772b868b4f4352bf41939f96a6b7ad)

## [创建地图](https://github.com/HenryTSZ/sokoban-vue3/tree/34ea99dbe041f1789aacd3aac3c7ad1f0b987fbd)

## [重构及单测地图](https://github.com/HenryTSZ/sokoban-vue3/tree/14888773c1b9d4c2c9a1f890cf836229dc0a66f7)

## [添加玩家](https://github.com/HenryTSZ/sokoban-vue3/tree/8b487da65560ececa311a5b7be7c3400e99608cf)

## [玩家移动位置](https://github.com/HenryTSZ/sokoban-vue3/tree/9acd676ee8399f2f41e666363a4ddf273c1930c4)

## [碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/76f2289456bfde01ede6f4b0948f8a3a5f78b5a6)

## [重构玩家数据结构](https://github.com/HenryTSZ/sokoban-vue3/tree/63fb1f9bd9915a4450b0b6c89deee6e11be7dd06)

## 完成玩家移动位置

现在我们只完成了玩家向左移动的功能，现在我们来添加玩家向右/上/下移动的功能。

注：添加功能的时候最好使用小步走的方式，加一个功能就使用单测测试一下

### 补全其余三个方向的移动逻辑

`keeperCollisionDetector.ts`:

```ts
export const wallCollisionRight = (keeper: Keeper, map: Element[][]) => {
  const nextRightPosition = keeper.x + 1

  const element = map[keeper.y][nextRightPosition]

  return element.name === 'Wall'
}

export const wallCollisionUp = (keeper: Keeper, map: Element[][]) => {
  const nextTopPosition = keeper.y - 1

  const element = map[nextTopPosition][keeper.x]

  return element.name === 'Wall'
}

export const wallCollisionDown = (keeper: Keeper, map: Element[][]) => {
  const nextBottomPosition = keeper.y + 1

  const element = map[nextBottomPosition][keeper.x]

  return element.name === 'Wall'
}
```

`keeper.ts`:

```ts
export const moveRight = () => {
  if (wallCollisionRight(_keeper, getMap().map)) {
    return
  }
  _keeper.x++
}

export const moveUp = () => {
  if (wallCollisionUp(_keeper, getMap().map)) {
    return
  }
  _keeper.y--
}

export const moveDown = () => {
  if (wallCollisionDown(_keeper, getMap().map)) {
    return
  }
  _keeper.y++
}
```

`keeper.spec.ts`:

```ts
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
```

测试通过

`Keeper.vue`:

```ts
switch (e.code) {
  case 'ArrowLeft':
  case 'KeyH':
    moveLeft()
    break
  case 'ArrowRight':
  case 'KeyL':
    moveRight()
    break
  case 'ArrowUp':
  case 'KeyK':
    moveUp()
    break
  case 'ArrowDown':
  case 'KeyJ':
    moveDown()
    break
  default:
    break
}
```

页面也没问题

### 重构

测试用例重构：

目前所有的测试用例都是写在一起的，我们可以按移动方向分一下组：

```ts
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
```

碰撞检测重构:

首先 `nextLeftPosition` 这个其实我们不需要区分方向的，可以直接改成 `nextPosition`

其次，`const element = map[keeper.y][nextPosition]` 这是一个低层次的代码，根本就不知道代表的是什么，我们在写代码的时候，最好能让代码自己表达出自己的意思

那如何让代码自己表达出自己的意思呢？我们可以将其封装为一个行为，也就是一个函数

根据 `OOP` 的思想，这个行为是属于 `map` 的

`map.ts`:

```ts
export const getElementByPosition = (x: number, y: number) => {
  return _map[y][x]
}
```

那碰撞检测代码就变成这样了：

```ts
export const wallCollisionLeft = (keeper: Keeper) => {
  return getElementByPosition(keeper.x - 1, keeper.y).name === 'Wall'
}
```

比以前清晰了好多

由于这里不再需要 `map` 这个数据了，所以调用的地方也可以去掉这个参数了

我们通过函数名知道了是什么行为，这样就能让代码自己表达出自己的意思，而具体的行为是在函数内部实现的，就不用暴露低层次的代码了，这样就更加清晰了

同时，修改完成后，一定要看一下测试用例是否能通过
