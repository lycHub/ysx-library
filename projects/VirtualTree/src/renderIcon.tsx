import { defineComponent, PropType, toRefs, watch, reactive } from 'vue';
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
    setup({ context, node }) {
        const { loading, key } = node;
        const { expandedKeys, renderIcon, slots } = context;
        const expanded = $computed(() => expandedKeys.has(key));
        return () => {
            return renderIcon
            ? renderIcon({ node, loading, expanded })
            : slots.icon
            ? slots.icon({ node, loading, expanded })
            : <div class="def-arrow">
                {
                    loading ? <i class="iconfont iconloading ico-loading" /> : <i class="iconfont iconExpand"></i>
                }
            </div>;
        }
    }
});
