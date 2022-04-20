
<template>
  App
  <VirTree
    :source="list"
    show-checkbox
    :default-expanded-keys="defaultExpandedKeys"
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

    const list = $ref(recursion());

    let defaultExpandedKeys = $ref(['0-1']);
    setTimeout(() => {
      // defaultExpandedKeys = [];
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
