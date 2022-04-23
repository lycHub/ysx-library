
<template>
  <VirTree
    ref="virTree"
    :source="list"
    show-checkbox
    :load-data="loadData"
  />
</template>

<script setup lang="tsx">
  import { onMounted } from 'vue';
  import { BaseTreeNode, EventParams, SelectEventParams, TreeContext, TreeNodeOptions, VirTree } from '@ysx-libs/vue-virtual-tree';

  function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
      const list = [];
      for (let i = 0; i < h; i += 1) {
        const nodeKey = `${path}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true
        };
        list.push(treeNode);
      }
      return list;
    }


    let list = $ref(recursion());


    function loadData(node: BaseTreeNode, callback: (children: TreeNodeOptions[]) => void) {
        const result: TreeNodeOptions[] = [];
        for (let i = 0; i < 2; i += 1) {
          const nodeKey = `${node.key}-${i}`;
          const treeNode: TreeNodeOptions  = {
            nodeKey,
            name: nodeKey,
            children: [],
            hasChildren: true
          };
          result.push(treeNode);
        }
        setTimeout(() => {
          callback(result);
        }, 500);
      }

     
</script>
