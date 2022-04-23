<template>
  <a-button @click="checkedNode">获取选中节点</a-button>
  <div style="display: flex;">

    <VirTree ref="virTree" show-checkbox :source="list" :default-checked-keys="defaultCheckedKeys" />

    <VirTree ref="virTree" show-checkbox check-strictly :source="list" :default-checked-keys="defaultCheckedKeys" />
  </div>
</template>

<script setup lang="tsx">
import { TreeNodeOptions, VirTree, TreeContext } from '@ysx-libs/vue-virtual-tree';

function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
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
let defaultCheckedKeys = $ref<string[]>(['0-0', '0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-1-4',]);

const virTree = $ref<TreeContext>();

const checkedNode = () => {
  const node = virTree!.getCheckedNodes();
  console.log('selected node', node);
}
</script>
