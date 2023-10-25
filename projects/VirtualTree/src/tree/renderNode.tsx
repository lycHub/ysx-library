import { defineComponent, PropType, renderSlot, toRefs } from 'vue';
import { BaseTreeNode } from './baseTreeNode';
import { TreeContext } from "./types";

export default defineComponent({
    name: 'RenderNode',
    props: {
        titleCls: String,
        node: {
            type: Object as PropType<BaseTreeNode>,
            required: true
        },
        context: {
            type: Object as PropType<TreeContext>,
            required: true
        }
    },
    setup(props) {
        const { context, node, titleCls } = toRefs(props);
        return () => {
            return context.value.renderNode
                ? context.value.renderNode(node.value)
                : context.value.slots.node
                    ? renderSlot(context.value.slots, 'node', { node: node.value })
                    : <span class={titleCls.value}>{node.value.name}</span>;
        }
    }
});
