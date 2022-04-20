<template>
  <div class="vir-tree">
vir-tree-container
  </div>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue';
import { useTreeData } from './hooks/use-tree-data';
import { NodeKey, TreeNodeOptions } from './types';

 const props = defineProps({
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: []
    },
    defaultSelectedKey: {
      type: [String, Number],
      default: ''
    },
    defaultExpandedKeys: {
      type: Array as PropType<NodeKey[]>,
      default: []
    },
    defaultCheckedKeys: {
      type: Array as PropType<NodeKey[]>,
      default: []
    },
    defaultDisabledKeys: {
      type: Array as PropType<NodeKey[]>,
      default: []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
  });

  watch(() => props.source, newVal => {
    // console.log('wat source :>> ', newVal); // todo reset states
    const {
      treeData, // 格式化后的tree
      flattenTreeData,
      key2TreeNode
    } = useTreeData(newVal);
    console.log('flattenTreeData :>> ', flattenTreeData);
    console.log('key2TreeNode :>> ', key2TreeNode);
  }, {
    immediate: true
  });

</script>

<style scoped>
</style>
