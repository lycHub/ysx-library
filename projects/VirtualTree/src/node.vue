<template>
  <div class="vir-tree-node" :style="{ paddingLeft }" @click="handleExpand">

    <div :class="['node-arrow', props.expandedKeys.has(props.node.key) ? 'expanded' : '']">
      <template v-if="props.node.hasChildren">
        <div class="def-arrow">
          <i class="iconfont iconloading ico-loading" v-if="props.node.loading" />
          <i class="iconfont iconExpand" v-else></i>
        </div>
      </template>
    </div>

    <vir-check-box
      class="node-content node-check-box"
      v-if="props.showCheckbox"
      :disabled="props.disabledKeys.has(props.node.key)"
      :modelValue="props.checkedKeys.has(props.node.key)"
      :halfChecked="props.halfCheckedKeys.has(props.node.key)"
      @change="handleCheckChange">
        <span class="node-title">{{ props.node.name }}</span>
    </vir-check-box>
    <div class="node-content node-text" v-else>
      <span :class="titleCls">{{ props.node.name }}</span>
    </div>
    </div>
</template>


<script lang="ts">
    export default defineComponent({
        name: 'TreeNode'
    })
</script>

<script setup lang="ts">
import { PropType, watch, Slot, defineComponent } from 'vue';
import VirCheckBox from './checkbox/index.vue';
import { BaseTreeNode } from './baseTreeNode';
import { NodeKey } from './types';

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
    // iconSlot: Function as PropType<Slot>,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // checkStrictly: {
    //   type: Boolean,
    //   default: false
    // },
    // render: Function
  });


  const emit = defineEmits<{
    (e: 'checkChange', value: [boolean, BaseTreeNode]): void;
    (e: 'toggleExpand', value: BaseTreeNode): void;
  }>();

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


    const handleCheckChange = (checked: boolean) => {
      emit('checkChange', [checked, props.node]);
    }

    const handleExpand = () => {
      emit('toggleExpand', props.node);
    }


</script>
