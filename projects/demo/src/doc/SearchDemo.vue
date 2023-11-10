
<template>
  <a-input v-model:value="searchKey" placeholder="请搜索" />
  <VirTree
    ref="virTree"
    :source="list"
    :default-expanded-keys="defaultExpandKeys"
    :render-node="renderNode"
    :virtual="{ size: 26, remain: 8 }">
  </VirTree>
</template>

<script setup lang="tsx">
import { watch, ref } from 'vue';
import {
  BaseTreeNode,
  TreeNodeOptions,
  VirTree,
  NodeKey
} from '@ysx-libs/vue-virtual-tree';

const prefixes = ['leaf', 'sub', 'sub', 'root'];

function recursion(path = '0', level = 3, h = 10): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const hasChildren = level > 0;
    const treeNode: TreeNodeOptions  = {
      nodeKey,
      name: `${prefixes[level]}-${nodeKey}`,
      children: [],
      hasChildren
    };

    if (hasChildren) {
      treeNode.children = recursion(nodeKey, level - 1);
    }
    list.push(treeNode);
  }
  return list;
}

const defaultExpandKeys = ref<NodeKey[]>([]);
  const searchKey = ref('');
const list = ref(recursion());

watch(() => searchKey.value, newVal => {
  // console.log('wat searchKey', newVal)
  defaultExpandKeys.value = [];
  list.value = searchData(recursion(), newVal);
});

function renderNode(node: BaseTreeNode) {
  const wrapValue = node.name.replace(searchKey.value, `<span class="node-highlight">$&</span>`);
  return <div innerHTML={ wrapValue }></div>;
}

function searchData(origin: TreeNodeOptions[], keyword: string) {
  const loop = (data: TreeNodeOptions[]) => {
    const result: TreeNodeOptions[] = [];
    data.forEach(item => {
      if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);
        if (filterData.length) {
          defaultExpandKeys.value.push(item.nodeKey);
          result.push({
            ...item,
            children: filterData
          });
        }
      }
    });
    return result;
  }

  return loop(origin);
}
</script>


<style>
  .node-highlight {
    color: #f60;
  }
</style>
