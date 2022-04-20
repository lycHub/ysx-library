<template>
  <div class="vir-tree">
    aaa
    <!-- <TreeNode
        v-for="node in visibleTreeNodeList"
        :key="node.key"
        v-bind="node.treeNodeProps"
      /> -->
  </div>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue';
import { useTreeData } from './hooks/useTreeData';
import { BaseTreeNode } from './baseTreeNode';
import { KeyNodeMap, NodeKey, TreeNodeOptions } from './types';

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


  let treeData = $ref<BaseTreeNode[]>([]);
  let flattenTreeData = $ref<BaseTreeNode[]>([]);
  let key2TreeNode = $ref<KeyNodeMap>({});


  watch(() => props.source, newVal => {
    // console.log('wat source :>> ', newVal); // todo reset states
    const result = useTreeData(newVal);
    treeData = result.treeData;
    flattenTreeData = result.flattenTreeData;
    key2TreeNode = result.key2TreeNode;
    // console.log('flattenTreeData :>> ', flattenTreeData);
    console.log('treeData :>> ', treeData);
  }, {
    immediate: true
  });

  const expandedKeysSet = new Set(props.defaultExpandedKeys);

  const visibleTreeNodeList = $computed(() => {
    return flattenTreeData.filter((node) => {
      const isRoot = !node.parentKey;
      const isVisibleNode = node.parentKeys.every(key => expandedKeysSet.has(key));
      return isRoot || isVisibleNode;
    });
  });
  console.log('visibleTreeNodeList :>> ', visibleTreeNodeList);
</script>

<style scoped>
</style>
