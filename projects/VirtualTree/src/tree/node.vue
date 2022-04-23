<template>
  <div class="vir-tree-node" :style="{ paddingLeft }" @click="handleExpand">

    <div :class="['node-arrow', props.expandedKeys.has(props.node.key) ? 'expanded' : '']">
      <render-icon :context="treeContext" :node="props.node" v-if="showArrow" />
    </div>

    <vir-check-box
      class="node-content node-check-box"
      v-if="props.showCheckbox"
      :disabled="props.disabledKeys.has(props.node.key)"
      :modelValue="props.checkedKeys.has(props.node.key)"
      :halfChecked="props.halfCheckedKeys.has(props.node.key)"
      @change="handleCheckChange">
        <render-node title-cls="node-title" :context="treeContext" :node="props.node" />
    </vir-check-box>
    <div class="node-content node-text" v-else @click="handleSelect">
      <render-node :title-cls="titleCls" :context="treeContext" :node="props.node" />
    </div>
  </div>
</template>


<script lang="ts">
    export default defineComponent({
        name: 'TreeNode'
    })
</script>

<script setup lang="ts">
import { PropType, Slot, defineComponent, inject } from 'vue';
import VirCheckBox from '../checkbox/index.vue';
import RenderNode from './renderNode';
import renderIcon from './renderIcon';
import { BaseTreeNode } from './baseTreeNode';
import { EventParams, NodeKey } from './types';
import { TreeInjectionKey } from './context';

 const props = defineProps({
   node: {
      type: Object as PropType<BaseTreeNode>,
      required: true
    },
    selectedKeys: {
      type: Object as PropType<Set<NodeKey>>,
      required: true
    },
    
    expandedKeys: {
      type: Object as PropType<Set<NodeKey>>,
      required: true
    },
    disabledKeys: {
      type: Object as PropType<Set<NodeKey>>,
      required: true
    },
    checkedKeys: {
     type: Set as PropType<Set<NodeKey>>,
      required: true
    },
    halfCheckedKeys: {
     type: Set as PropType<Set<NodeKey>>,
      required: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  });


  const emit = defineEmits<{
    (e: 'selectChange', value: BaseTreeNode): void;
    (e: 'checkChange', value: BaseTreeNode): void;
    (e: 'toggleExpand', value: EventParams): void;
  }>();

  const treeContext = inject(TreeInjectionKey)!;

  const indent = 18;
  const paddingLeft = props.node.level * indent + 'px';

  const titleCls = $computed(() => {
      let result = 'node-title';
      if (props.selectedKeys.has(props.node.key)) {
        result += ' selected';
      }
      if (props.disabledKeys.has(props.node.key)) {
        result += ' disabled';
      }
      return result;
    });



    const showArrow = $computed(() => props.node.hasChildren);


   const handleSelect = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabledKeys.has(props.node.key)) {
        emit('selectChange', props.node);
      }
    }

    const handleCheckChange = () => {
      emit('checkChange', props.node);
    }

    const handleExpand = () => {
      if (showArrow) {
        emit('toggleExpand', {
          state: !treeContext.expandedKeys.has(props.node.key),
          node: props.node
        });
      }
    }


</script>
