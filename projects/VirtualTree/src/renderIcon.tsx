import { defineComponent, PropType, toRefs, watch } from 'vue';
import { BaseTreeNode } from './baseTreeNode';
import { TreeContext } from "./types";

export default defineComponent({
    name: 'RenderIcon',
    props: {
        node: {
            type: Object as PropType<BaseTreeNode>,
            required: true
        },
        context: {
            type: Object as PropType<TreeContext>,
            required: true
        },
    },
    setup(props) {
        // const { context, node } = $(toRefs(props));
        const { loading, key } = props.node;
        const expanded = $computed(() => props.context.expandedKeys.has(props.node.key));
        // console.log('expanded 22 :>> ', props.node.key,  expanded);
        return () => {
            return props.context.renderIcon
            ? props.context.renderIcon({ node: props.node, loading, expanded, })
            : props.context.slots.icon
            ? props.context.slots.icon({ node: props.node, loading, expanded, })
            : <div class="def-arrow">
                {
                    loading ? <i class="iconfont iconloading ico-loading" /> : <i class="iconfont iconExpand"></i>
                }
            </div>;
        }
    }
});
