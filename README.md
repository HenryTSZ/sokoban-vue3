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

## [解决 Cargo 报错](https://github.com/HenryTSZ/sokoban-vue3/tree/f811eb965bc6fe8852eebaf3d96440362f9e914f)

## [统一导出口](https://github.com/HenryTSZ/sokoban-vue3/tree/ee72436e762bf2c41f1f5a36d54561d2d5fdc453)

## 重构命名

目前 `keeperCollisionDetection.ts` 命名是不准确的，里面的方法不是检测 `keeper` 的，或者只能说是服务于 `keeper` 的，所以去掉 `keeper` 更好

这里重命名使用 `VSCode` 自带的 `rename` 命令来重命名，快捷键是 `F2`，重命名以后，相关的引用也会同步修改

同时里面的函数名也有点问题，应该是动词在前，比如 `wallCollision` 应改为 `collisionWall`，同理，还是使用 `F2` 来重命名

修改完成以后，一定要看一下测试是否通过

目前修改完是通过的

`fighting.ts` 命名也需要修改一下，我们是移动类的游戏，而不是战斗类的，所以改成 `move` 更好

同时里面的 `fighting` 函数也需要修改一下

而且函数里面的 `map` 对象可以提出来，没必要每次调用函数的时候都创建一个

对应的单测命名也需要修改一下，里面的测试全部都是关于 `game` 的，是我们的核心逻辑，所以改成 `game` 更好

我们里面写的都是比较大的测试

那除了这种方式，还可以写小的测试，比如 `map` 里的 `setupMap` 方法，`initMap` 方法等，都写对应的单测

那对于我们这个程序而言，就没有必要了，通过 `game.space.ts` 都可以测试到了

这么去测试的话，就把整体的游戏逻辑连起来测试了，当某一个算法更复杂一些的时候，在 `game.space.ts` 里面很难覆盖到的时候，才会转到更小的上下文里面去测试

而且我们是基于 `TDD` 来写的，如果拆分的太小了，我们在重构的时候有可能就把这个功能删除了，那测试就白写了

重新跑一下测试，也没有问题
