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
        @toggleExpand="toggleExpand"
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
import { addOrDelete } from './utils';

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


  const emit = defineEmits<{
    (e: 'checkChange', value:{ status: boolean; node: BaseTreeNode }): void;
    (e: 'toggleExpand', value: { status: boolean; node: BaseTreeNode }): void;
  }>();

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
  // console.log('key2TreeNode :>> ', key2TreeNode);
  // console.log('treeData :>> ', treeData);
}, {
  immediate: true
});

let selectedKeys = new Set<NodeKey>();
watch(() => props.defaultSelectedKey, newVal => {
  selectedKeys.clear();
  selectedKeys = new Set([newVal]);
}, {
  immediate: true
});

let disabledKeys = new Set<NodeKey>();
watch(() => props.defaultDisabledKeys, newVal => {
  disabledKeys.clear();
  disabledKeys = new Set(newVal);
}, {
  immediate: true
});


const checkedKeys = $ref(new Set<NodeKey>());
const halfCheckedKeys = $ref(new Set<NodeKey>());

watch(() => props.defaultCheckedKeys, newVal => {
  console.log('wat checked :>> ');
  if (props.showCheckbox) {
    // todo: 懒加载会改变key2TreeNode，重新调用useCheckState
    useCheckState(newVal, {
      checkedKeys,
      halfCheckedKeys,
      checkStrictly: props.checkStrictly,
      key2TreeNode
    });
  }
}, {
  immediate: true
});


watchEffect(() => { // 只会调用一次
  // console.log('watchEffect :>> ', props.defaultCheckedKeys, props.source);
});


const visibleTreeNodeList = $computed(() => {
  // console.log('visibleTreeNodeList :>> ', expandedKeys);
  return flattenTreeData.filter((node) => {
    const isRoot = !node.parentKey;
    const isVisibleNode = node.parentKeys.every(key => expandedKeys.has(key));
    return isRoot || isVisibleNode;
  });
});
  // console.log('visibleTreeNodeList :>> ', visibleTreeNodeList);


let expandedKeys = $ref(new Set<NodeKey>());
watch(() => props.defaultExpandedKeys, newVal => {
  expandedKeys.clear();
  expandedKeys = new Set(newVal);
}, {
  immediate: true
});

  let loading = $ref(false);
  const toggleExpand = (node: BaseTreeNode) => {
      if (loading) return;
      const expanded = expandedKeys.has(node.key);
      expandedKeys[addOrDelete(!expanded)](node.key);
      // service.expandedKeys.value.toggle(node.nodeKey);
      if (!expanded && !node.children.length) {
        console.log('懒加载 :>> ');
         /* if (props.loadData) {
            node.loading = true;
            loading.value = true;
            // this.$forceUpdate();
            props.loadData(node, children => {
              node.loading = false;
              loading.value = false;
              if (children.length) {
                expandNode(node, children);
              }
            });
          } */
      }
      emit('toggleExpand', { status: expandedKeys.has(node.nodeKey), node });
    }

    function expandNode(node: BaseTreeNode) {
      console.log('expandNode :>> ', expandedKeys);
      // expandedKeys
    }

    function collapseNode(node: BaseTreeNode) {

    }


</script>
