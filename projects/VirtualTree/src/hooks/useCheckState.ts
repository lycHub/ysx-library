
import { KeyNodeMap, NodeKey, TreeNodeOptions } from '../types';
import { BaseTreeNode } from '../baseTreeNode';
import { watch, watchEffect } from 'vue';
import { SelectionModel } from '../selection';

function useCheckState(defaultCheckedKeys: NodeKey[], checkedKeys: SelectionModel<NodeKey>, halfCheckedKeys: SelectionModel<NodeKey>) {
  checkedKeys.clear();
  checkedKeys.select(...defaultCheckedKeys);
  halfCheckedKeys.clear();
}

// let checkedKeys = $ref<NodeKey[]>([]);
function testWatch(defaultCheckedKeys: NodeKey[]) {
  // checkedKeys = defaultCheckedKeys;
  watch(defaultCheckedKeys, newVal => {
    console.log('testWatch checkedKeys:>> ', newVal);
  });
  watchEffect(() => {
    console.log('watchEffect  checkedKeys:>> ', defaultCheckedKeys);
  });
}


export { useCheckState, testWatch };
