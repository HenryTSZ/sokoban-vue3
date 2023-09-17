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

## [完成箱子移动位置](https://github.com/HenryTSZ/sokoban-vue3/tree/d4357f05de68758614ea555ad7a6a496b37c2abd)

## [解决 Map.vue 遗留报错问题](https://github.com/HenryTSZ/sokoban-vue3/tree/4ac226cc42426d69b8b5ded3e3bb38ce9ad9f0aa)

## [重构移动逻辑](https://github.com/HenryTSZ/sokoban-vue3/tree/99b7c77ab47744ee8d1a4d6d5cbc230205fa0804)

## 箱子与箱子的碰撞检测

当箱子移动方向的下一个位置是箱子时，箱子和玩家都不能移动了。

按照惯例，我们还是先写测试

```ts
it('should not move cargo and keeper to left when next position is cargo', () => {
  initKeeper({ x: 3, y: 1 })
  initCargos([
    { x: 2, y: 1 },
    { x: 1, y: 1 }
  ])
  fighting(Direction.Left)
  const cargo = getCargos()[0]
  expect(cargo.x).toBe(2)
  expect(getKeeper().x).toBe(3)
})
```

当然现在测试还是报错的，我们去实现一下这个逻辑

在检测完与墙的碰撞之后，再去检测一下与箱子的碰撞。

所以我们还需要一个箱子碰撞的函数：`cargoCollision`

```ts
export const cargoCollision = (position: Position) => {
  return !!getCargoByPosition(position)
}
```

然后调用一下：

```ts
if (cargo) {
  if (wallCollision(calcPosition(cargo))) {
    return
  }
  if (cargoCollision(calcPosition(cargo))) {
    return
  }
  cargo[directionName] += directionValue
}
```

测试通过了，页面也没问题

然后我们把剩余的测试写完
