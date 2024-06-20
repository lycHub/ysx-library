import { defineComponent, PropType, toRefs, renderSlot, computed } from "vue";
import { BaseTreeNode } from "./baseTreeNode";
import { TreeContext } from "./types";

export default defineComponent({
  name: "RenderIcon",
  props: {
    node: {
      type: Object as PropType<BaseTreeNode>,
      required: true,
    },
    context: {
      type: Object as PropType<TreeContext>,
      required: true,
    },
  },
  setup({ context, node }) {
    const { loading, key } = toRefs(node);
    const { expandedKeys, renderIcon, slots } = context;
    const expanded = computed(() => expandedKeys.has(key.value));
    return () => {
      return renderIcon
        ? renderIcon({ node, loading: loading.value, expanded: expanded.value })
        : slots.icon
          ? renderSlot(slots, 'icon', { node, loading: loading.value, expanded: expanded.value })
          : <div class="def-arrow">
            {
              loading.value ? <i class="iconfont iconloading ico-loading" /> : <i class="iconfont iconExpand"></i>
            }
          </div>;
    };
  }
});
