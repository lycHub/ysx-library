
import { KeyNodeMap, NodeKey } from '../types';
import { BaseTreeNode } from '../baseTreeNode';
import { addOrDelete } from '../../utils';

interface CurrentState {
  checkedKeys: Set<NodeKey>,
  halfCheckedKeys: Set<NodeKey>,
  checkStrictly: boolean;
  key2TreeNode: KeyNodeMap;
}

function useCheckState(defaultCheckedKeys: NodeKey[], { checkedKeys, halfCheckedKeys, checkStrictly, key2TreeNode }: CurrentState) {
  checkedKeys.clear();
  halfCheckedKeys.clear();
  defaultCheckedKeys.forEach(key => {
    if (!checkedKeys.has(key)) {
      const node = key2TreeNode[key];
      // console.log('node :>> ', node);
      if (node) {
        updateCheckedState({
          node,
          checked: true,
          checkedKeys,
          halfCheckedKeys,
          key2TreeNode,
          checkStrictly
        });
      } else {
        checkedKeys.add(key);
      }
    }
  });
  // console.log('halfCheckedKeys :>> ', halfCheckedKeys);
}



function updateCheckedState(options: {
  node: BaseTreeNode;
  checked: boolean;
  checkedKeys: Set<NodeKey>;
  halfCheckedKeys: Set<NodeKey>;
  key2TreeNode: KeyNodeMap;
  checkStrictly: boolean;
}) {
  const { node, checked, checkedKeys, halfCheckedKeys, key2TreeNode, checkStrictly } = options;
  checkedKeys[addOrDelete(checked)](node.key)
  halfCheckedKeys.delete(node.key);
  if (!checkStrictly) {
    updateChildrenCheckState({
      node,
      checked,
      checkedKeys,
      halfCheckedKeys
    });
    updateUpwards({
      node,
      key2TreeNode,
      checkedKeys,
      halfCheckedKeys
    });
  }
}


function updateChildrenCheckState(options: {
  node: BaseTreeNode;
  checked: boolean;
  checkedKeys: Set<NodeKey>;
  halfCheckedKeys: Set<NodeKey>;
}) {
  const { node, checked, checkedKeys, halfCheckedKeys } = options;
  const setFunc = addOrDelete(checked);
  const update = (list: BaseTreeNode[]) => {
    if (list.length) {
      list.forEach(child => {
        checkedKeys[setFunc](child.key);
        halfCheckedKeys.delete(child.key);
        if (child.children?.length) {
          update(child.children);
        }
      });
    }
  }
  update(node.children);
}

function updateUpwards(options: {
  node: BaseTreeNode;
  key2TreeNode: KeyNodeMap;
  checkedKeys: Set<NodeKey>;
  halfCheckedKeys: Set<NodeKey>;
}) {
  const { node, checkedKeys, halfCheckedKeys, key2TreeNode } = options;
  const update = (node: BaseTreeNode) => {
    if (node.parentKey) { // 说明是子节点
      const parentNode = key2TreeNode[node.parentKey];
      const { key: parentKey, children } = parentNode;
      // console.log('parentNode', parentNode);
      const { checked, indeterminate } = getStateFromNodes({
        nodes: children,
        checkedKeys,
        halfCheckedKeys,
      });
      // console.log('indeterminate :>> ', indeterminate, checked, checkedKeys.has(parentKey));
      if (checked !== checkedKeys.has(parentKey) || indeterminate !== halfCheckedKeys.has(parentKey)) { // 父节点变了的话，就还要继续向上更新
        // this.checkedNodeKeys.value.toggle(parentKey);
        
        checkedKeys[addOrDelete(checked)](parentKey);
        halfCheckedKeys[addOrDelete(indeterminate)](parentKey);
        update(parentNode);
      }
    }
  }
  update(node);
}

function getStateFromNodes(options: {
  nodes: BaseTreeNode[];
  checkedKeys: Set<NodeKey>;
  halfCheckedKeys: Set<NodeKey>;
}) {
  const { nodes, checkedKeys, halfCheckedKeys } = options;

  let checkedCount = 0;
  let indeterminate = false;

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];
    const childChecked = checkedKeys.has(child.key);
    const childIndeterminate = halfCheckedKeys.has(child.key);
    if (childChecked) {
      checkedCount++;
    }
    if (childIndeterminate || (!childChecked && checkedCount > 0)) {
      indeterminate = true;
      break;
    }
  }

  const checked = checkedCount === nodes.length;

  return {
    checked,
    indeterminate: indeterminate || (!checked && checkedCount > 0),
  };
}




export { useCheckState, updateCheckedState };
