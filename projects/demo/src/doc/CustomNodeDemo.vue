<template>
  <div style="display: flex;">
    <vir-tree :source="list" show-checkbox :render-node="renderNode" />

    <vir-tree :source="list" show-checkbox>
      <template #node="{ node }">
        <b style="color: green;"><i>{{ node.name }}</i></b>
      </template>
    </vir-tree>
  </div>
</template>

<script setup lang="tsx">
import { onMounted } from 'vue';
import { TreeNodeOptions, VirTree, BaseTreeNode } from '@ysx/vue-next-tree';

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


function renderNode(node: BaseTreeNode) {
  return <div style="padding: 0 4px;"><b style="color: #f60;">{node.name}</b></div>
}
</script>
