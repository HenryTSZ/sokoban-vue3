# sokoban-vue3

## [初始化项目](https://github.com/HenryTSZ/sokoban-vue3/tree/68b262e0a4772b868b4f4352bf41939f96a6b7ad)

## [创建地图](https://github.com/HenryTSZ/sokoban-vue3/tree/34ea99dbe041f1789aacd3aac3c7ad1f0b987fbd)

## [重构及单测地图](https://github.com/HenryTSZ/sokoban-vue3/tree/14888773c1b9d4c2c9a1f890cf836229dc0a66f7)

## [添加玩家](https://github.com/HenryTSZ/sokoban-vue3/tree/8b487da65560ececa311a5b7be7c3400e99608cf)

## [玩家移动位置](https://github.com/HenryTSZ/sokoban-vue3/tree/9acd676ee8399f2f41e666363a4ddf273c1930c4)

## [碰撞检测](https://github.com/HenryTSZ/sokoban-vue3/tree/76f2289456bfde01ede6f4b0948f8a3a5f78b5a6)

## 重构玩家数据结构

目前玩家向左移动及碰撞检测都做完了，我们只需要按现有逻辑把其他三个方向的功能添加进来即可。

但我们先来重构一下代码吧。

目前碰撞检测的逻辑是写在 `keeper.ts` 中，我们需要把它抽离出来，抽离后需要两个数据：`keeper` 和 `map`

`map` 我们可以通过 `getMap` 方法获取，但 `keeper` 目前无法获取到，因为它的实例对象在 `Keeper.vue` 中

所有我们需要修改一下 `keeper` 的数据结构，不使用类了，和 `map` 的数据结构一样

注：因为玩家只有一个，所以我们其实不需要使用类去定义，而和 `map` 一样的方式这个思路就很妙，调用 `init` 方法后就把传入的数据保存到内部，外界是无法访问的，但我可以给你提供一个 `get` 方法，让外界可以访问。这样就起到保护数据的作用，并且还可以和外界进行交互

### 玩家数据结构

```ts
import { getMap } from './map'

export interface Keeper {
  x: number
  y: number
}

let _keeper: Keeper

export const getKeeper = () => _keeper

export const initKeeper = (keeper: Keeper) => {
  _keeper = keeper
}

export const moveLeft = () => {
  if (getMap().map[_keeper.y][_keeper.x - 1].name === 'Wall') {
    return
  }
  _keeper.x--
}
```

修改以后单测就报错了，需要解决一下

```ts
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
```

测试通过

同理，再解决一下页面报错：

```vue
<template>
  <img
    class="map-img keeper"
    :src="keeperSrc"
    :style="{ top: `${keeper.y * 32}px`, left: `${keeper.x * 32}px` }" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import keeperSrc from '../assets/keeper.png'
import { type Keeper, initKeeper, moveLeft } from '../game/keeper'

const keeper: Keeper = reactive({
  x: 5,
  y: 1
})
initKeeper(keeper)

function handleKeyup(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowLeft':
    case 'KeyH':
      moveLeft()
      console.log(keeper)
      break
    default:
      break
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})
onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<style scoped>
.keeper {
  position: absolute;
}
</style>
```

测试通过

### 抽离位置

但我们 `style` 也需要重构一下，提取一个 `usePosition` 方法，统一处理位置

新建一个 `src/composables/position.ts` 文件:

```ts
const STEP = 32

export interface Position {
  x: number
  y: number
}

export const usePosition = (position: Position) => {
  const top = position.y * STEP
  const left = position.x * STEP
  return `top: ${top}px; left: ${left}px;`
}
```

在 `Keeper.vue` 中验证一下:

```vue
<img class="map-img keeper" :src="keeperSrc" :style="positionStyle" />
```

```ts
import { usePosition } from '../composables/position'

const keeper: Keeper = reactive({
  x: 5,
  y: 1
})
initKeeper(keeper)

const positionStyle = usePosition(keeper)
```

发现初始化位置是正确的，但无法移动了。

排查发现我们只在初始化的时候计算了一下玩家的位置，但在移动时并没有重新计算位置。

所以我们在 `usePosition` 方法中需要使用计算属性

```ts
export const usePosition = (position: Position) => {
  const top = computed(() => position.y * STEP)
  const left = computed(() => position.x * STEP)
  return computed(() => `top: ${top.value}px; left: ${left.value}px;`)
}
```

测试通过

### 修改 Keeper 类型

这里我们发现 `Keeper` 的类型和 `Position` 类型不一致，所以我们可以让 `Keeper` 类型继承 `Position` 类型。

```ts
export interface Keeper extends Position {}
```

### 抽离碰撞检测

所有数据都有了，我们可以抽离碰撞检测的逻辑。

创建一个 `src/game/keeperCollisionDetection.ts` 文件:

```ts
import { Keeper } from './keeper'
import { Element } from './map'

export const wallCollisionLeft = (keeper: Keeper, map: Element[][]) => {
  const nextLeftPosition = keeper.x - 1

  const element = map[keeper.y][nextLeftPosition]

  return element.name === 'Wall'
}
```

替换到 `keeper.ts` 中:

```ts
export const moveLeft = () => {
  if (wallCollisionLeft(_keeper, getMap().map)) {
    return
  }
  _keeper.x--
}
```

单测也通过了，页面也没问题
