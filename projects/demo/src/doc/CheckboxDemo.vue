<template>
  <a-button @click="checkedNode">获取选中节点</a-button>
  <div style="display: flex;">
    <VirTree ref="virTree" :source="list" show-checkbox :default-checked-keys="defaultCheckedKeys" />
    <VirTree ref="virTree2" :source="list" show-checkbox check-strictly :default-checked-keys="defaultCheckedKeys" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import VirTree, { TreeNodeOptions, TreeContext } from '@ysx-libs/vue-virtual-tree';

function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      // showCheckbox: true,
      children: []
    };

    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    }
    list.push(treeNode);
  }
  return list;
}
const list = ref(recursion());
const defaultCheckedKeys = ref<string[]>(['0-0', '0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-1-4',]);

const virTree = ref<TreeContext>();
const virTree2 = ref<TreeContext>();

const checkedNode = () => {
  const node = virTree.value!.getCheckedNodes();
  const node2 = virTree2.value!.getCheckedNodes();
  console.log('selected node', node);
  console.log('selected node 2', node2);
}
</script>
