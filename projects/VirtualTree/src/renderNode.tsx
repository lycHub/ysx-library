import { defineComponent, PropType, renderSlot } from "vue";
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
    setup({ context, node, titleCls }) {
        return () => {
            return context.renderNode
            ? context.renderNode(node)
            : context.slots.node
            ? renderSlot(context.slots, 'node', { node })
            : <span class={ titleCls }>{ node.name }</span>;
        }
    }
});
