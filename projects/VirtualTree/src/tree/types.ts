import { Slots } from 'vue';
import { BaseTreeNode } from './baseTreeNode';
import { TypeWithUndefined } from '../utils/types';

type NodeKey = string | number;

/*
* 用户传入的source必须要有 key, name
* */

interface TreeNodeOptions {
  nodeKey: NodeKey;
  name: string;
  showCheckbox?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  [key: string]: any;
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


type RenderNodeFunc = (node: BaseTreeNode) => JSX.Element;
type RenderIconFunc = (params: { node: BaseTreeNode; loading: boolean; expanded: boolean; }) => JSX.Element;
type LoadDataFunc = (node: BaseTreeNode, callback: (children: TreeNodeOptions[]) => void) => void;


type TreeContext = Readonly<{
  renderNode: TypeWithUndefined<RenderNodeFunc>;
  renderIcon: TypeWithUndefined<RenderIconFunc>;
  slots: Slots;
  expandedKeys: Set<NodeKey>;
  getSelectedNode: () => TypeWithUndefined<BaseTreeNode>;
  getCheckedNodes: () => BaseTreeNode[];
  getHalfCheckedNodes: () => BaseTreeNode[];
  getExpandedKeys: () => NodeKey[];
}>;


interface VirtualConfig {
  size: number;
  remain: number;
}

export type { BaseTreeNode, TreeNodeOptions, NodeKey, TreeNodeInstance, KeyNodeMap, EventParams, SelectEventParams, RenderNodeFunc, RenderIconFunc, LoadDataFunc, TreeContext, VirtualConfig };
