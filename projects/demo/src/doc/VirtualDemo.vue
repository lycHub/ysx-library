
<template>
  <VirTree
    ref="virTree"
    :source="list"
    show-checkbox
    :virtual="{ size: 26, remain: 8 }">
  </VirTree>
</template>

<script setup lang="tsx">
  import { ref } from 'vue';
  import { TreeNodeOptions, VirTree } from '@ysx-libs/vue-virtual-tree';

  function recursion(path = '0', level = 3, h = 10): TreeNodeOptions[] {
      const list = [];
      for (let i = 0; i < h; i += 1) {
        const nodeKey = `${path}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: level > 0
        };

        if (level > 0) {
          treeNode.children = recursion(nodeKey, level - 1);
        }
        list.push(treeNode);
      }
      return list;
    }

    const list = ref(recursion());
</script>
