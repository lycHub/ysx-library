## Vue Virtual Tree

> Vue3 虚拟树组件

### 安装
```
npm i @ysx-libs/vue-virtual-tree
```

### 基本使用
```vue
<template>
  <a-button @click="selectedNode">获取选中节点</a-button>
  <VirTree
    ref="virTree"
    :source="list"
    :default-selected-key="defaultSelectedKey"
  />
</template>

<script setup lang="tsx">
  import { TreeNodeOptions, VirTree, TreeContext } from '@ysx-libs/vue-virtual-tree';

  function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
      const list = [];
      for (let i = 0; i < h; i += 1) {
        const nodeKey = `${path}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: []
        };

        if (level > 0) {
          treeNode.children = recursion(nodeKey, level - 1);
        }
        list.push(treeNode);
      }
      return list;
    }
    let list = $ref(recursion());
    let defaultSelectedKey = $ref('0-2');

    const virTree = $ref<TreeContext>();
      
    const selectedNode = () => {
      const node = virTree!.getSelectedNode();
      console.log('selected node', node);
    }
</script>

```

### [doc](https://vue-tree-4gi26kh195ddd24f-1257117519.tcloudbaseapp.com/docs/tree)
### [demo](https://stackblitz.com/edit/vitejs-vite-1j17xa)