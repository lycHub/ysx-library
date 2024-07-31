<template>
  <div class="vir-tree" tabindex="0" @keydown="handleKeyboardNavigation" @focusin="onFocusIn" @focusout="onFocusOut">
    <RecycleScroller v-if="virtualHeight" class="vir-tree-wrap" :style="{ height: virtualHeight + 'px' }"
      :items="visibleList" :item-size="props.virtual?.size" key-field="key" v-slot="{ item }">
      <tree-node :node="item" :key="item.key" :show-checkbox="showCheckbox" :selected-keys="selectedKeys"
        :disabled-keys="disabledKeys" :expanded-keys="expandedKeys" :checked-keys="checkedKeys" :focus-key="focusKey"
        :half-checked-keys="halfCheckedKeys" :indent-type="indentType" @toggleExpand="toggleExpand"
        @selectChange="selectChange" @checkChange="checkChange" />
    </RecycleScroller>

    <div class="vir-tree-wrap" v-else>
      <tree-node v-for="item of visibleList" :key="item.key" :node="item" :show-checkbox="showCheckbox"
        :selected-keys="selectedKeys" :disabled-keys="disabledKeys" :expanded-keys="expandedKeys" :focus-key="focusKey"
        :checked-keys="checkedKeys" :half-checked-keys="halfCheckedKeys" :indent-type="indentType"
        @toggleExpand="toggleExpand" @selectChange="selectChange" @checkChange="checkChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, PropType, provide, shallowReactive, toRaw, useSlots, watch, watchEffect } from 'vue';
// @ts-ignore
import { RecycleScroller } from 'vue-virtual-scroller';
import { coerceTreeNodes, getFlattenTreeData, getKey2TreeNode, useTreeData } from './hooks/useTreeData';
import { BaseTreeNode } from './baseTreeNode';
import { EventParams, FocusEventParams, KeyNodeMap, LoadDataFunc, KeydownEvent, NodeKey, RenderIconFunc, RenderNodeFunc, SelectEventParams, TreeNodeOptions, VirtualConfig } from './types';
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
  indentType: {
    type: String as PropType<("padding" | "margin")>,
    default: "padding"
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
  (e: 'focusChange', value: FocusEventParams): void;
  (e: 'keydown', value: KeydownEvent): void;
}>();

const flattenTreeData = ref<BaseTreeNode[]>([]);
const key2TreeNode = ref<KeyNodeMap>({});

watch(() => props.source, newVal => {
  // console.log('wat source :>> ', newVal); // todo reset states
  const result = useTreeData(newVal);
  // console.log('result', result);
  flattenTreeData.value = result.flattenTreeData;
  key2TreeNode.value = result.key2TreeNode;
}, {
  immediate: true
});

const disabledKeys = ref(new Set<NodeKey>());
watch(() => props.defaultDisabledKeys, newVal => {
  disabledKeys.value.clear();
  disabledKeys.value = new Set(newVal);
}, {
  immediate: true
});

const checkedKeys = ref(new Set<NodeKey>());
const halfCheckedKeys = ref(new Set<NodeKey>());

watch(() => props.defaultCheckedKeys, newVal => {
  // console.log('wat defaultCheckedKeys :>> ', newVal);
  // todo: 懒加载会改变key2TreeNode，重新调用useCheckState
  useCheckState(newVal, {
    checkedKeys: checkedKeys.value,
    halfCheckedKeys: halfCheckedKeys.value,
    checkStrictly: props.checkStrictly,
    key2TreeNode: key2TreeNode.value
  });
  // console.log('checkedKeys :>> ', checkedKeys);
}, {
  immediate: true
});


watchEffect(() => { // 只会调用一次
  // console.log('watchEffect :>> ', props.defaultCheckedKeys, props.source);
});


const visibleList = computed(() => {
  return flattenTreeData.value.filter((node) => {
    const isRoot = !node.parentKey;
    const isVisibleNode = node.parentKeys.every(key => expandedKeys.value.has(key));
    return isRoot || isVisibleNode;
  });
});

const virtualHeight = computed(() => {
  if (props.virtual) {
    return +(props.virtual.size * props.virtual.remain) || 0;
  }
  return 0;
})


const expandedKeys = ref(new Set<NodeKey>());
watch(() => props.defaultExpandedKeys, newVal => {
  expandedKeys.value.clear();
  expandedKeys.value = new Set(newVal);
}, {
  immediate: true
});

const loading = ref(false);

// state: 点击后的展开状态
function toggleExpand({ state, node, source }: EventParams) {
  if (loading.value) return;
  expandedKeys.value[addOrDelete(state)](node.key);
  // service.expandedKeys.value.toggle(node.nodeKey);
  if (state && !node.children.length && props.loadData) {
    // console.log('loadData :>> ');
    node.loading = true;
    loading.value = true;
    props.loadData(node, children => {
      node.loading = false;
      loading.value = false;
      if (children.length) {
        lazyLoad(node, children);

        useCheckState([...checkedKeys.value], {
          checkedKeys: checkedKeys.value,
          halfCheckedKeys: halfCheckedKeys.value,
          checkStrictly: props.checkStrictly,
          key2TreeNode: key2TreeNode.value
        });
      } else {
        node.children = [];
        node.hasChildren = false;
      }

    });
  }
  emit('expandChange', { state, node, source: source || 'click' });
}


function lazyLoad(node: BaseTreeNode, children: TreeNodeOptions[]) {
  // console.log('lazyLoad :>> ', node, children);
  const indexInFlattenData = flattenTreeData.value.findIndex(item => item.key === node.key);
  const childrenData = coerceTreeNodes(children, node);
  node.children = childrenData;
  const childrenFlattenData = getFlattenTreeData(childrenData);
  flattenTreeData.value.splice(indexInFlattenData + 1, 0, ...childrenFlattenData);
  const key2ChildrenNode = getKey2TreeNode(childrenFlattenData);
  Object.assign(key2TreeNode.value, key2ChildrenNode);
  childrenFlattenData.forEach(async item => {
    if (expandedKeys.value.has(item.key)) {
      await nextTick();
      toggleExpand({ state: true, node: item });
    }
  });
}


const selectedKeys = ref(new Set<NodeKey>());
watch(() => props.defaultSelectedKey, newVal => {
  selectedKeys.value.clear();
  selectedKeys.value.add(newVal);
}, {
  immediate: true
});
const selectedNode = computed(() => key2TreeNode.value[Array.from(selectedKeys.value.values())[0]]);

const focusKey = ref<NodeKey>();

function focusChange(node?: BaseTreeNode) {
  if (!node) {
    return;
  }
  focusKey.value = node.key;
  emit('focusChange', { node })
}

function onFocusOut(event: FocusEvent) {
  // remove focus
  focusKey.value = undefined;
  emit('focusChange', { node: null });
}

function onFocusIn(event: FocusEvent) {
  // select first element if nothing is selected
  if (!focusKey.value) {
    focusChange(flattenTreeData.value?.at(0));
  }
}

function handleKeyboardNavigation(event: KeyboardEvent) {
  const { key } = event;

  if (!focusKey.value) {
    return;
  }

  const currentFocusedNode = key2TreeNode.value[focusKey.value];

  const getNextNode = (node: BaseTreeNode, offset: number) => {
    if (!node) {
      return;
    }
    const index = visibleList.value.findIndex(({ key }) => key === node.key);
    return visibleList.value?.[index + offset];
  };

  const arrowRight = () => {
    event.stopPropagation();
    event.preventDefault();
    if (currentFocusedNode.hasChildren) {
      if (expandedKeys.value.has(currentFocusedNode.key)) {
        focusChange(getNextNode(currentFocusedNode, 1));
      } else {
        toggleExpand({ node: currentFocusedNode, state: true, source: 'key' });
      }
    }
  };

  const arrowLeft = () => {
    event.stopPropagation();
    event.preventDefault();

    if (expandedKeys.value.has(currentFocusedNode.key)) {
      toggleExpand({ node: currentFocusedNode, state: false, source: 'key' });
    } else {
      if (currentFocusedNode.parentKey) {
        focusChange(key2TreeNode.value[currentFocusedNode.parentKey]);
      }
    }
  };


  switch (key) {
    case "ArrowUp":
      event.preventDefault();
      focusChange(getNextNode(currentFocusedNode, -1));
      break;
    case "ArrowDown":
      event.preventDefault();
      focusChange(getNextNode(currentFocusedNode, 1));
      break;
    case "ArrowLeft":
      event.preventDefault();
      arrowLeft();
      break;
    case "ArrowRight":
      event.preventDefault();
      arrowRight();
      break;
  }

  emit("keydown", { event, node: currentFocusedNode });
}

function selectChange(node: BaseTreeNode) {
  const preSelectedNode = key2TreeNode.value[Array.from(selectedKeys.value.values())[0]];
  let currentNode: TypeWithUndefined<BaseTreeNode>;
  if (selectedKeys.value.has(node.key)) {
    selectedKeys.value.clear();
  } else {
    selectedKeys.value.clear();
    selectedKeys.value.add(node.key);
    currentNode = node;
  }
  emit('selectChange', { preSelectedNode, node: currentNode });
}

function checkChange(node: BaseTreeNode) {
  const newChecked = !checkedKeys.value.has(node.key);
  updateCheckedState({
    node,
    checked: newChecked,
    checkedKeys: checkedKeys.value,
    halfCheckedKeys: halfCheckedKeys.value,
    key2TreeNode: key2TreeNode.value,
    checkStrictly: props.checkStrictly
  });
  emit('checkChange', { state: newChecked, node });
}

const context = shallowReactive({
  renderNode: props.renderNode,
  renderIcon: props.renderIcon,
  slots: useSlots(),
  expandedKeys: expandedKeys.value,
  getExpandedKeys: () => [...expandedKeys.value],
  getSelectedNode: () => selectedNode.value,
  getCheckedNodes: () => Array.from(checkedKeys.value).map(key => key2TreeNode.value[key]).filter(Boolean), // 懒加载的情况下未必能拿到node
  getHalfCheckedNodes: () => Array.from(halfCheckedKeys.value).map(key => key2TreeNode.value[key]),
  toggleExpand: (nodeKey: NodeKey, state?: boolean) =>
    toggleExpand({ state: state ?? !expandedKeys.value.has(nodeKey), node: key2TreeNode.value[nodeKey], source: 'api' })
});

defineExpose(toRaw(context));
provide(TreeInjectionKey, context);
</script>
