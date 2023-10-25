<template>
  <div class="vir-tree">
    <RecycleScroller
        v-if="virtualHeight"
        class="vir-tree-wrap"
        :style="{ height: virtualHeight + 'px' }"
        :items="visibleList"
        :item-size="props.virtual?.size"
        key-field="key"
        v-slot="{ item }">
        <tree-node
          :node="item"
          :key="item.key"
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
    </RecycleScroller>

    <div class="vir-tree-wrap" v-else>
      <tree-node
        v-for="item of visibleList"
        :key="item.key"
        :node="item"
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
import { nextTick, PropType, provide, shallowReactive, toRaw, useSlots, watch, watchEffect } from 'vue';
// @ts-ignore
import { RecycleScroller } from 'vue-virtual-scroller';
import { coerceTreeNodes, getFlattenTreeData, getKey2TreeNode, useTreeData } from './hooks/useTreeData';
import { BaseTreeNode } from './baseTreeNode';
import { EventParams, KeyNodeMap, LoadDataFunc, NodeKey, RenderIconFunc, RenderNodeFunc, SelectEventParams, TreeNodeOptions, VirtualConfig } from './types';
import TreeNode from './node.vue';
import { updateCheckedState, useCheckState } from './hooks/useCheckState';
import { addOrDelete } from '../utils';
import { TypeWithUndefined } from '../utils/types';
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
  renderNode: Function as PropType<RenderNodeFunc>,
  renderIcon: Function as PropType<RenderIconFunc>,
  loadData: Function as PropType<LoadDataFunc>,
  virtual: Object as PropType<VirtualConfig>
});


  const emit = defineEmits<{
    (e: 'selectChange', value: SelectEventParams): void;
    (e: 'checkChange', value: EventParams): void;
    (e: 'expandChange', value: EventParams): void;
  }>();

let flattenTreeData = $ref<BaseTreeNode[]>([]);
let key2TreeNode = $ref<KeyNodeMap>({});

watch(() => props.source, newVal => {
  // console.log('wat source :>> '); // todo reset states
  const result = useTreeData(newVal);
  flattenTreeData = result.flattenTreeData;
  key2TreeNode = result.key2TreeNode;
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
  // console.log('wat defaultCheckedKeys :>> ', newVal);
  if (props.showCheckbox) {
    // todo: 懒加载会改变key2TreeNode，重新调用useCheckState
    useCheckState(newVal, {
      checkedKeys,
      halfCheckedKeys,
      checkStrictly: props.checkStrictly,
      key2TreeNode
    });
    // console.log('checkedKeys :>> ', checkedKeys);
  }
}, {
  immediate: true
});


watchEffect(() => { // 只会调用一次
  // console.log('watchEffect :>> ', props.defaultCheckedKeys, props.source);
});


const visibleList = $computed(() => {
  return flattenTreeData.filter((node) => {
    const isRoot = !node.parentKey;
    const isVisibleNode = node.parentKeys.every(key => expandedKeys.has(key));
    return isRoot || isVisibleNode;
  });
});

const virtualHeight = $computed(() => {
  if (props.virtual) {
    return +(props.virtual.size * props.virtual.remain) || 0;
  }
  return 0;
})


let expandedKeys = $ref(new Set<NodeKey>());
watch(() => props.defaultExpandedKeys, newVal => {
  expandedKeys.clear();
  expandedKeys = new Set(newVal);
}, {
  immediate: true
});

  let loading = $ref(false);

  // state: 点击后的展开状态
  function toggleExpand({ state, node }: EventParams) {
      if (loading) return;
      expandedKeys[addOrDelete(state)](node.key);
      // service.expandedKeys.value.toggle(node.nodeKey);
      if (state && !node.children.length && props.loadData) {
        // console.log('loadData :>> ');
        node.loading = true;
        loading = true;
        props.loadData(node, children => {
          node.loading = false;
          loading = false;
          if (children.length) {
            lazyLoad(node, children);
            useCheckState([...checkedKeys], {
              checkedKeys,
              halfCheckedKeys,
              checkStrictly: props.checkStrictly,
              key2TreeNode
            });
          } else {
            node.children = [];
            node.hasChildren = false;
          }

        });
      }
      emit('expandChange', { state, node });
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
      childrenFlattenData.forEach(async item => {
        if (expandedKeys.has(item.key)) {
          await nextTick();
          toggleExpand({ state: true, node: item });
        }
      });
    }


    let selectedKeys = $ref(new Set<NodeKey>());
    watch(() => props.defaultSelectedKey, newVal => {
      selectedKeys.clear();
      selectedKeys.add(newVal);
    }, {
      immediate: true
    });
    const selectedNode = $computed(() => key2TreeNode[Array.from(selectedKeys.values())[0]]);
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
        key2TreeNode,
        checkStrictly: props.checkStrictly
      });
      emit('checkChange', { state: newChecked, node });
    }

    const context = shallowReactive({
      renderNode: props.renderNode,
      renderIcon: props.renderIcon,
      slots: useSlots(),
      expandedKeys,
      getExpandedKeys: () => [...expandedKeys],
      getSelectedNode: () => selectedNode,
      getCheckedNodes: () => Array.from(checkedKeys).map(key => key2TreeNode[key]).filter(Boolean), // 懒加载的情况下未必能拿到node
      getHalfCheckedNodes: () => Array.from(halfCheckedKeys).map(key => key2TreeNode[key]),
    });

    defineExpose(toRaw(context));
    provide(TreeInjectionKey, context);
</script>
