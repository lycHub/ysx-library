import {defineComponent, PropType, toRefs} from "vue";
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
        }
    },
    setup(props) {
        // const { context, node } = $(toRefs(props));
      
        const { loading } = props.node;
        const expanded = props.context.expandedKeys.has(props.node.key);
        // console.log('expandedKeys :>> ', props.context.expandedKeys, expanded, props.node.key);
        console.log('renderIcon :>> ', props.context.expandedKeys);
        return () => {
            return props.context.renderIcon
            ? props.context.renderIcon({ node: props.node, loading, expanded })
            : props.context.slots.icon
            ? props.context.slots.icon({ node: props.node, loading, expanded })
            : <div class="def-arrow">
                {
                    loading ? <i class="iconfont iconloading ico-loading" /> : <i class="iconfont iconExpand"></i>
                }
            </div>;
        }
    }
});
