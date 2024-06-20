import { KeyNodeMap, TreeNodeOptions } from '../types';
import { BaseTreeNode } from '../baseTreeNode';

function useTreeData(source: TreeNodeOptions[]) {
  const treeData = coerceTreeNodes(source);
  const flattenTreeData = getFlattenTreeData(treeData);
  const key2TreeNode = getKey2TreeNode(flattenTreeData);
  return { treeData, flattenTreeData, key2TreeNode };
}

function coerceTreeNodes(
  source: TreeNodeOptions[],
  parent?: BaseTreeNode
): BaseTreeNode[] {
  const recursion = (
    list: TreeNodeOptions[],
    parentNode?: BaseTreeNode
  ): BaseTreeNode[] => {
    return list.map((item) => {
      const node =
        item instanceof BaseTreeNode
          ? item
          : new BaseTreeNode(item, parentNode);
      node.children = item.children?.length
        ? recursion(item.children, node)
        : [];
      node.hasChildren = item.hasChildren || node.children.length > 0;
      return node;
    });
  };
  return recursion(source, parent);
}

function getFlattenTreeData(tree: BaseTreeNode[]): BaseTreeNode[] {
  const nodes: BaseTreeNode[] = [];
  function recursion(list: BaseTreeNode[]) {
    list.forEach((node) => {
      nodes.push(node);
      recursion(node.children);
    });
  }
  recursion(tree);
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
