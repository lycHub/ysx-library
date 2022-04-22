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
        @selectChange="selectChange"
        @checkChange="checkChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, PropType, provide, reactive, ref, useSlots, watch, watchEffect } from 'vue';
import { coerceTreeNodes, getFlattenTreeData, getKey2TreeNode, useTreeData } from './hooks/useTreeData';
import { BaseTreeNode } from './baseTreeNode';
import { EventParams, KeyNodeMap, LoadDataFunc, NodeKey, RenderIconFunc, RenderNodeFunc, SelectEventParams, TreeNodeOptions } from './types';
import { SelectionModel } from './selection';
import TreeNode from './node.vue';
import { updateCheckedState, useCheckState } from './hooks/useCheckState';
import { addOrDelete } from './utils';
import { TypeWithUndefined } from './utils/types';
import { TreeInjectionKey } from './context';

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
  renderNode: {
    type: Function as PropType<RenderNodeFunc>
  },
  renderIcon: {
    type: Function as PropType<RenderIconFunc>
  },
  loadData: {
    type: Function as PropType<LoadDataFunc>,
  }
});


  const emit = defineEmits<{
    (e: 'selectChange', value: SelectEventParams): void;
    (e: 'checkChange', value: EventParams): void;
    (e: 'toggleExpand', value: EventParams): void;
  }>();

let treeData = $ref<BaseTreeNode[]>([]);
let flattenTreeData = $ref<BaseTreeNode[]>([]);
let key2TreeNode = $ref<KeyNodeMap>({});
watch(() => props.source, newVal => {
  // console.log('wat source :>> '); // todo reset states
  if (newVal.length) {
    const result = useTreeData(newVal);
    treeData = result.treeData;
    flattenTreeData = result.flattenTreeData;
    key2TreeNode = result.key2TreeNode;
    // console.log('flattenTreeData :>> ', flattenTreeData);
    // console.log('key2TreeNode :>> ', key2TreeNode);
    // console.log('treeData :>> ', treeData);
  }
}, {
  immediate: true
});

let disabledKeys = $ref(new Set<NodeKey>());
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
  const ins = getCurrentInstance();
  console.log('ins :>> ', ins);
  // state: 点击后的展开状态
  function toggleExpand({ state, node }: EventParams) {
      if (loading) return;
      expandedKeys[addOrDelete(state)](node.key);
      // service.expandedKeys.value.toggle(node.nodeKey);
      if (state && !node.children.length && props.loadData) {
        node.loading = true;
        loading = true;
        props.loadData(node, children => {
          // await nextTick();
          node.loading = false;
          loading = false;
           
          if (children.length) {
            lazyLoad(node, children);
          } else {
            node.children = [];
            node.hasChildren = false;
          }
          // forceUpdate();
          if (ins?.proxy) {
            // ins.proxy.$forceUpdate()
          }
         
        });
      }
      emit('toggleExpand', { state, node });
    }


    function lazyLoad(node: BaseTreeNode, children: TreeNodeOptions[]) {
      // console.log('lazyLoad :>> ', node, children);
      const indexInFlattenData = flattenTreeData.findIndex(item => item.key === node.key);
      const childrenData = coerceTreeNodes(children, node);
      node.children = childrenData;
      const childrenFlattenData = getFlattenTreeData(childrenData);
      flattenTreeData.splice(indexInFlattenData + 1, 0, ...childrenFlattenData);
      const key2ChildrenNode = getKey2TreeNode(childrenFlattenData);
      Object.assign(key2TreeNode, key2ChildrenNode);
      // console.log('childrenFlattenData :>> ', childrenFlattenData, expandedKeys);
      childrenFlattenData.forEach(item => {
        if (expandedKeys.has(item.key)) {
          toggleExpand({ state: true, node: item });
        }
      })
    }


    let selectedKeys = $ref(new Set<NodeKey>());
    watch(() => props.defaultSelectedKey, newVal => {
      selectedKeys.clear();
      selectedKeys.add(newVal);
    }, {
      immediate: true
    });
    function selectChange(node: BaseTreeNode) {
      const preSelectedNode = key2TreeNode[Array.from(selectedKeys.values())[0]];
      let currentNode: TypeWithUndefined<BaseTreeNode>;
      if (selectedKeys.has(node.key)) {
        selectedKeys.clear();
      } else {
        selectedKeys.clear();
        selectedKeys.add(node.key);
        currentNode = node;
      }
      emit('selectChange', { preSelectedNode, node: currentNode });
    }



    function checkChange(node: BaseTreeNode) {
      const newChecked = !checkedKeys.has(node.key);
      updateCheckedState({
        node,
        checked: newChecked,
        checkedKeys,
        halfCheckedKeys,
        key2TreeNode
      });
      emit('checkChange', { state: newChecked, node });
    }
    
    const context = reactive({
      renderNode: props.renderNode,
      renderIcon: props.renderIcon,
      slots: useSlots(),
      expandedKeys
    })
    provide(TreeInjectionKey, context);
</script>
