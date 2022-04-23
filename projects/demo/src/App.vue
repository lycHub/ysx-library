<template>
  App
  <a-button>Add</a-button>
  <vir-tree
    :source="list"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :render-node="renderNode"
    :render-icon="renderIcon"
    :default-disabled-keys="defaultDisabledKeys"
    :default-selected-key="defaultSelectedKey"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys">
    <template #node="node">
      <b style="color: green;"><i>{{ node.name }}</i></b>
    </template>
    <template #icon="{ loading, expanded }">
      <span>ico-{{ expanded }}</span>
    </template>
  </vir-tree>
</template>

<script setup lang="tsx">
  import { onMounted } from 'vue';
  import { TreeNodeOptions, VirTree, BaseTreeNode } from '@ysx/vue-virtual-tree';

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

    const showCheckbox = false;
    const checkStrictly = false;
    let list = $ref(recursion());
    let defaultDisabledKeys = $ref(['0-3-1']);
    let defaultSelectedKey = $ref('');
    let defaultExpandedKeys = $ref(['0-1-1']);
    let defaultCheckedKeys = $ref<string[]>(['0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-1-4',]);
    setTimeout(() => {
      // defaultExpandedKeys = [];
      // defaultCheckedKeys = ['0-2'];
      // list = recursion('0', 3, 4);
    }, 2000)
    onMounted(() => {
      
    });


    function renderNode(node: BaseTreeNode) {
      return <div style="padding: 0 4px;"><b style="color: #f60;">{ node.name }</b></div>
    }
    function renderIcon({ expanded }: any) {
      return <div>i-{ expanded.toString() }</div>;
    }
</script>
