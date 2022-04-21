import { BaseTreeNode } from './baseTreeNode';
import { TypeWithUndefined } from './utils/types';

type NodeKey = string | number;

/*
* 用户传入的source必须要有 key, name
* */

interface TreeNodeOptions {
  nodeKey: NodeKey;
  name: string;
  level?: number;
  loading?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  parentKey?: NodeKey | null;
  parentKeys?: NodeKey[];
}

interface TreeInstance {
  getSelectedNode: () => TreeNodeOptions | undefined;
  getCheckedNodes: () => TreeNodeOptions[];
  getHalfCheckedNodes: () => TreeNodeOptions[];
  getExpandedKeys: () => NodeKey[];
}

interface TreeNodeInstance {
  rawNode: TreeNodeOptions;
  halfChecked: () => boolean;
}


type KeyNodeMap = Record<NodeKey, BaseTreeNode>;


interface EventParams {
  state: boolean;
  node: BaseTreeNode;
}


interface SelectEventParams {
  preSelectedNode: TypeWithUndefined<BaseTreeNode>;
  node: TypeWithUndefined<BaseTreeNode>;
}

export type { TreeNodeOptions, NodeKey, TreeInstance, TreeNodeInstance, KeyNodeMap, EventParams, SelectEventParams };
