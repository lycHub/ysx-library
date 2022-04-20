import { NodeKey, TreeNodeOptions } from "./types";
import { TypeWithUndefined } from "./utils/types";

/* 
  const treeNodeProps = {
    ...omit(mapTreeNodeData, ['children']),
    key: mapTreeNodeData.key ?? generateKey(),
    selectable: getBoolean(mapTreeNodeData.selectable, treeProps?.selectable),
    disabled: !!mapTreeNodeData.disabled,
    disableCheckbox: !!mapTreeNodeData.disableCheckbox,
    checkable: getBoolean(mapTreeNodeData.checkable, treeProps?.checkable),
    isLeaf: treeProps.loadMore
      ? !!mapTreeNodeData.isLeaf
      : !mapTreeNodeData.children?.length,
    isTail,
    blockNode: !!treeProps?.blockNode,
    showLine: !!treeProps?.showLine,
    level: parentNode ? parentNode.level + 1 : 0,
    // showLine 模式下是否显示缩进线。
    // 如果父节点是其所在层级的最后一个节点，那么所有的子节点（包括孙子节点等）在父节点所在层级的缩进格都不显示缩进线。
    lineless: parentNode ? [...parentNode.lineless, parentNode.isTail] : [],
    draggable: getBoolean(mapTreeNodeData.draggable, treeProps?.draggable),
  };

  const node = {
    ...treeNodeProps,
    treeNodeProps,
    treeNodeData,
    parent: parentNode,
    parentKey: parentNode?.key,
    pathParentKeys: parentNode
      ? [...parentNode.pathParentKeys, parentNode.key as TreeNodeKey]
      : [],
  };
*/

export class TreeNode {
  readonly key: NodeKey;
  readonly name: string;
  readonly level: number;
  loading = false;
  children: TreeNode[] = [];
  parentKey: TypeWithUndefined<NodeKey>;
  parentKeys: NodeKey[] = [];
  constructor(options: TreeNodeOptions, parent?: TreeNode) {
    this.key = options.nodeKey;
    this.name = options.name;
    this.parentKey = parent?.key;
    this.parentKeys = parent ? [...parent.parentKeys, parent.key] : [];
    this.level = parent ? parent.level + 1 : 0;
  }

  get isLeaf() {
    return this.children.length === 0;
  }
}