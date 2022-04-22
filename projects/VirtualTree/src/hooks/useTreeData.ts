
import { KeyNodeMap, NodeKey, TreeNodeOptions } from '../types';
import { BaseTreeNode } from '../baseTreeNode';

function useTreeData(source: TreeNodeOptions[]) {
  const treeData = coerceTreeNodes(source);
  const flattenTreeData = getFlattenTreeData(treeData);
  const key2TreeNode = getKey2TreeNode(flattenTreeData);
  return { treeData, flattenTreeData, key2TreeNode };
}


function coerceTreeNodes(source: TreeNodeOptions[]): BaseTreeNode[] {
    const dig = (list: TreeNodeOptions[], parent?: BaseTreeNode): BaseTreeNode[] => {
      return list.map(item => {
        const node = item instanceof BaseTreeNode ? item : new BaseTreeNode(item, parent);
        node.children = item.children?.length ? dig(item.children, node) : [];
        node.hasChildren = item.hasChildren || node.children.length > 0;
        return node;
      });
    }
    const nodes = dig(source || []);
    return nodes;
}

function getFlattenTreeData(tree: BaseTreeNode[]): BaseTreeNode[] {
  const nodes: BaseTreeNode[] = [];
  function dig(list: BaseTreeNode[]) {
    list.forEach(node => {
      nodes.push(node);
      dig(node.children);
    });
  }
  dig(tree);
  return nodes;
}




function getKey2TreeNode(flattenTreeData: BaseTreeNode[]) {
  const key2TreeNode: KeyNodeMap = {};
  flattenTreeData.forEach((node) => {
    key2TreeNode[node.key] = node;
  });
  return key2TreeNode;
}

export { useTreeData, coerceTreeNodes, getFlattenTreeData, getKey2TreeNode };
