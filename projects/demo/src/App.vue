
<template>
  App
  <vir-tree
    :source="list"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :load-data="loadData"
    :render-node="renderNode"
    :default-disabled-keys="defaultDisabledKeys"
    :default-selected-key="defaultSelectedKey"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys">
    <template #node="node">
      <b style="color: green;"><i>{{ node.name }}</i></b>
    </template>
  </vir-tree>
</template>

<script setup lang="tsx">
  import { onMounted } from 'vue';
  import { TreeNodeOptions, VirTree } from 'vue-next-tree';
import { BaseTreeNode } from '../../VirtualTree/src/baseTreeNode';

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

        if (level > 0) {
          // treeNode.children = recursion(nodeKey, level - 1);
        }
        list.push(treeNode);
      }
      return list;
    }

    const showCheckbox = true;
    const checkStrictly = false;
    let list = $ref(recursion());
    let defaultDisabledKeys = $ref(['0-3-1']);
    let defaultSelectedKey = $ref('');
    let defaultExpandedKeys = $ref(['0-1-1']);
    let defaultCheckedKeys = $ref<string[]>(['0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-1-4',]);
    setTimeout(() => {
      // defaultExpandedKeys = [];
      // defaultCheckedKeys = ['0-2'];
      console.log('object :>> ');
      // list = recursion('0', 3, 4);
    }, 2000)
    onMounted(() => {
      
    });


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


    function renderNode(node: BaseTreeNode) {
      return <div style="padding: 0 4px;"><b style="color: #f60;">{ node.name }</b></div>
    }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
