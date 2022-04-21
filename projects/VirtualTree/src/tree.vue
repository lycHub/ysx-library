<template>
  <div class="vir-tree">
    <div class="vir-tree-wrap">
      <tree-node
        v-for="node in visibleTreeNodeList"
        :key="node.key"
        :node="node"
        :show-checkbox="showCheckbox"
        :selected-keys="selectedKeys"
        :disabled-keys="disabledKeys"
        :expanded-keys="expandedKeys"
        :checked-keys="checkedKeys"
        :half-checked-keys="halfCheckedKeys"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, ref, watch, watchEffect } from 'vue';
import { useTreeData } from './hooks/useTreeData';
import { BaseTreeNode } from './baseTreeNode';
import { KeyNodeMap, NodeKey, TreeNodeOptions } from './types';
import { SelectionModel } from './selection';
import TreeNode from './node.vue';
import { useCheckState, testWatch } from './hooks/useCheckState';

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
  // console.log('wat source :>> '); // todo reset states
  const result = useTreeData(newVal);
  treeData = result.treeData;
  flattenTreeData = result.flattenTreeData;
  key2TreeNode = result.key2TreeNode;
  // console.log('flattenTreeData :>> ', flattenTreeData);
  // console.log('treeData :>> ', treeData);
}, {
  immediate: true
});
const expandedKeys = new SelectionModel<NodeKey>(true);
watch(() => props.defaultExpandedKeys, newVal => {
  expandedKeys.clear();
  expandedKeys.select(...newVal);
}, {
  immediate: true
});

const selectedKeys = new SelectionModel<NodeKey>(true);
watch(() => props.defaultSelectedKey, newVal => {
  selectedKeys.clear();
  selectedKeys.select(newVal);
}, {
  immediate: true
});

const disabledKeys = new SelectionModel<NodeKey>(true);
watch(() => props.defaultDisabledKeys, newVal => {
  disabledKeys.clear();
  disabledKeys.select(...newVal);
}, {
  immediate: true
});


const checkedKeys = $ref(new SelectionModel<NodeKey>(true));
const halfCheckedKeys = $ref(new SelectionModel<NodeKey>(true, []));

watch(() => props.defaultCheckedKeys, newVal => {
  console.log('wat checked :>> ');
  useCheckState(newVal, checkedKeys, halfCheckedKeys);
}, {
  immediate: true
});


watchEffect(() => { // 只会调用一次
  // console.log('watchEffect :>> ', props.defaultCheckedKeys, props.source);
});


const visibleTreeNodeList = $computed(() => {
  return flattenTreeData.filter((node) => {
    const isRoot = !node.parentKey;
    const isVisibleNode = node.parentKeys.every(key => expandedKeys.isSelected(key));
    return isRoot || isVisibleNode;
  });
});
  // console.log('visibleTreeNodeList :>> ', visibleTreeNodeList);
</script>
