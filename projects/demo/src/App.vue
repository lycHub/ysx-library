
<template>
  App
  <VirTree
    :source="list"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
  />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { TreeNodeOptions, VirTree } from 'vue-next-tree';

  function recursion(path = '0', level = 2): TreeNodeOptions[] {
      const list = [];
      for (let i = 0; i < 6; i += 1) {
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

    const showCheckbox = true;
    const checkStrictly = false;
    let list = $ref(recursion());
    let defaultExpandedKeys = $ref(['0-1', '0-1-1']);
    let defaultCheckedKeys = $ref<string[]>(['0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-1-4',]);
    setTimeout(() => {
      // defaultExpandedKeys = [];
      // defaultCheckedKeys = ['0-2'];
      console.log('object :>> ');
      // list = [];
    }, 2000)
    onMounted(() => {
      
    });
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
