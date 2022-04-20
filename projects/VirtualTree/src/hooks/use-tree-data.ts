
import { NodeKey, TreeNodeOptions } from '../types';
import { TreeNode } from '../tree-base-node';

export function useTreeData(source: TreeNodeOptions[]) {
  const treeData = $ref<TreeNode[]>(coerceTreeNodes(source));
  const flattenTreeData = $computed(() => getFlattenTreeData(treeData));
  const key2TreeNode = $computed(() => getKey2TreeNode(flattenTreeData));
  return { treeData, flattenTreeData, key2TreeNode };
}



function coerceTreeNodes(source: TreeNodeOptions[]): TreeNode[] {
    const dig = (list: TreeNodeOptions[], parent?: TreeNode): TreeNode[] => {
      return list.map(item => {
        const node = item instanceof TreeNode ? item : new TreeNode(item, parent);
        node.children = item.children?.length ? dig(item.children, node) : [];
        return node;
      });
    }
    const nodes = dig(source || []);
    return nodes;
}

function getFlattenTreeData(tree: TreeNode[]): TreeNode[] {
  const nodes: TreeNode[] = [];
  function dig(list: TreeNode[]) {
    list.forEach(node => {
      nodes.push(node);
      dig(node.children);
    });
  }
  dig(tree);

  return nodes;
}



export type KeyNodeMap = Record<NodeKey, TreeNode>;
export function getKey2TreeNode(flattenTreeData: TreeNode[]) {
  const key2TreeNode: KeyNodeMap = {};
  flattenTreeData.forEach((node) => {
    key2TreeNode[node.key] = node;
  });
  return key2TreeNode;
}