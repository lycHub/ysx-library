
<template>
  <div style="display: flex;">
    <VirTree :source="list" show-checkbox :render-icon="renderIcon" :load-data="loadData" />

    <VirTree :source="list" show-checkbox :load-data="loadData">
      <template #icon="{ loading, expanded, node }">
        <i v-if="loading" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
    </VirTree>
  </div>
</template>

<script setup lang="tsx">
import { onMounted } from 'vue';
import { BaseTreeNode, EventParams, SelectEventParams, TreeContext, TreeNodeOptions, VirTree } from '@ysx/vue-next-tree';

function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
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
    const treeNode: TreeNodeOptions = {
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
function renderIcon({ expanded, loading, node }: any) {
  return loading ? <i class="iconfont iconcustom-icon ico-loading"></i> : <i class="iconfont iconzhankai"></i>;
}

</script>
