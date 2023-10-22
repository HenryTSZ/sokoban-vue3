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

## [箱子与箱子的碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/7531444c086a345cce0855ef7956598b19fd8ef7)

## [添加放置点](https://github.com/HenryTSZ/sokoban-vue3/tree/252048acc321dd3c0fadf645ca558d0f612f26d7)

## [箱子与放置点的碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/70da190fc5ef796eab8ed2b2f9c103f1c7e321f5)

## [检测游戏是否胜利](https://github.com/HenryTSZ/sokoban-vue3/tree/c99ae23cefbc9ebf360e413b09fb4741f368e2cf)

## [进入下一关](https://github.com/HenryTSZ/sokoban-vue3/tree/07c7d67d567e639c7ce7471e20274de27e894482)

## [重构所有数据处理](https://github.com/HenryTSZ/sokoban-vue3/tree/eb75dd380425938a859f182a79145e979e958412)

## 解决 Cargo 报错

现在的现象是箱子没有出来，还报错了

在网上查询报错信息，意思就是说：多了个 value，在渲染 div 的时候，一些部分不应该有 value

详见：[Vue3 数据对接报错（Unhandled error during execution of render function ）](https://www.cnblogs.com/zsbb/p/17070297.html)

试了一下，去掉 `.value` 确实不报错了，但箱子还是没有出来

```vue
:style="positionStyles[index]"
```

而且这种写法是不对的，因为 `positionStyles[index]` 是一个响应式数据，必须使用 `.value` 来获取，而不是直接获取

关于这个报错和原因本人就无从得知了，但想到了解决办法，无非就是等 `game.loaded` 为 true 之后再去渲染

首先在 `Game.vue` 中当 `loaded` 以后渲染 `Cargo.vue`

```vue
<Cargo v-if="game.loaded" />
```

那 `setupCargo` 初始化就无法执行了，所以只能在 `Game.vue` 中执行了

```ts
const cargos = reactive([])
setupCargos(cargos)
```

然后在 `Cargo.vue` 中通过 `getCargos` 获取数据，这样就可以渲染了

```ts
const cargos = getCargos()
const positionStyles = cargos.map(cargo => usePosition(cargo))
```

这样不报错了，箱子也能渲染出来了，操作也没有问题

但进入第二关就不行了，首先箱子的位置还是第一关最后的位置，不是第二关初始化的位置，而且玩家也无法推箱子了（视图不渲染）

难道使用 `getCargos()` 获取到的 `cargos` 不是响应式的吗？

通过在页面输出 `{{ cargos }}` 发现是响应式的，那就是 `positionStyles` 不是响应式的了

现在看这段代码：

```ts
const positionStyles = cargos.map(cargo => usePosition(cargo))
```

确实有问题，因为 `map` 是返回一个新值

所以我们不能在这里获取 `positionStyle` 了，而应该这样获取：

```vue
:style="usePosition(cargo).value"
```

那我们一开始说要在 `loaded` 为 true 之后才渲染 `Cargo.vue`，这样改完以后是不是也不用了呢？

再把代码还原回去，也没有任何问题了
