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

## 解决 Map.vue 遗留报错问题

目前 `<component :is="componentMap[col.name]" />` 有类型错误

```
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ Empty: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}, {}>; Wall: DefineComponent<...>; Floor: DefineComponent<...>; }'.
  No index signature with a parameter of type 'string' was found on type '{ Empty: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}, {}>; Wall: DefineComponent<...>; Floor: DefineComponent<...>; }'.ts(7053)
```

这是 ai 给出的答案：

```
错误信息显示，你试图使用一个字符串来索引一个对象，但该对象没有一个适用于字符串的索引签名。

在你的代码中，componentMap 对象没有一个适用于字符串的索引签名，因此无法使用字符串来访问它的属性。为了解决这个错误，你可以为 componentMap 对象定义一个适用于字符串的索引签名。

以下是如何为 componentMap 定义一个适用于字符串的索引签名的示例：

const componentMap: Record<string, any> = {
  Empty,
  Wall,
  Floor
}

通过将 `Record<string, any>` 作为 componentMap 的类型，你允许使用任何字符串作为索引来访问 componentMap 的属性。
```

确实不报错了，但 `any` 让人不知道这到底是个啥类型

这里 Vue 提供了一个 `Component` 类型，它可以帮助你解决这个问题。

```ts
import { type Component } from 'vue'

const componentMap: Record<string, Component> = {
  Empty,
  Wall,
  Floor
}
```

这里有一个参考链接，可以帮助你理解

[Vue3 中使用 component :is 加载组件](https://blog.csdn.net/m0_51431448/article/details/122875963)
