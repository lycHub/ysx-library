## Mobile Picker

> 一款纯原生的list picker插件

### 特性
- 纯原生，与框架无关
- typescript编写
- 支持触摸、鼠标和触控笔(pointer event)
- 类似原生的滚动行为
- 支持滚轮
- 可点击选择

### [Document](https://lychub.github.io/ysx-library/docs/playground/mobile-picker/entry/)

### 安装
```
 npm add @ysx-libs/mobile-picker
```

### 在入口文件导入picker类和内置css
```typescript
 import { Picker } from '@ysx-libs/mobile-picker';

// 如果不引入css,则需要自己编写样式
@import "@ysx-libs/mobile-picker/style.css";

```

### 编写基础html模板

以 "mobile-*" 开头的class会应用上面的内置样式，类名不能错

```html
<div class="mobile-picker">
  <!-- picker view 容器 -->
  <div class="mobile-picker-view-container">

    <!-- 第一列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item0</div>
        <div class="mobile-picker-view-item">item1</div>
        <div class="mobile-picker-view-item">item2</div>
        <div class="mobile-picker-view-item">item3</div>
        <div class="mobile-picker-view-item">item4</div>
        <div class="mobile-picker-view-item">item5</div>
        <div class="mobile-picker-view-item">item6</div>
        <div class="mobile-picker-view-item">item7</div>
        <div class="mobile-picker-view-item">item8</div>
      </div>
    </div>

    <!-- 第二列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
        <div class="mobile-picker-view-item">item1-3</div>
        <div class="mobile-picker-view-item">item1-4</div>
      </div>
    </div>

    <!-- 第三列 -->
    <div class="mobile-picker-view">
      <div class="mobile-picker-view-item-container">
        <div class="mobile-picker-view-item">item1-0</div>
        <div class="mobile-picker-view-item">item1-1</div>
        <div class="mobile-picker-view-item">item1-2</div>
      </div>
    </div>

    <!-- 蒙层 -->
    <div class="mobile-picker-overlay">
      <div class="mobile-picker-overlay-mid"></div>
    </div>
  </div>
</div>

```


### 实例化picker
```typescript
let selectedIndexes: number[] = [];
            const pickerInstance = new Picker('.mobile-picker', {
              selectedIndexes,
              onChange(event) {
                selectedIndexes = event;
              }
            });

```

