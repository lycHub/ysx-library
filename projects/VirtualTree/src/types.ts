import { Slots } from 'vue';
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


type TreeContext = Readonly<{
  renderNode: TypeWithUndefined<(node: BaseTreeNode) => JSX.Element>;
  renderIcon: TypeWithUndefined<(params: { node: BaseTreeNode; loading: boolean; expanded: boolean; }) => JSX.Element>;
  slots: Slots;
  expandedKeys: Set<NodeKey>;
  // getSelectedNode: () => TypeWithUndefined<BaseTreeNode>;
  // getCheckedNodes: () => BaseTreeNode[];
  // getHalfCheckedNodes: () => BaseTreeNode[];
  // getExpandedKeys: () => NodeKey[];
}>;


export type { TreeNodeOptions, NodeKey, TreeInstance, TreeNodeInstance, KeyNodeMap, EventParams, SelectEventParams, TreeContext };
