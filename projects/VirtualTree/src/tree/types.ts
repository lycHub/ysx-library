import { Slots } from 'vue';
import { BaseTreeNode } from './baseTreeNode';
import { TypeWithNull, TypeWithUndefined } from '../utils/types';

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
  source?: 'api' | 'click' | 'key';
}

interface SelectEventParams {
  preSelectedNode: TypeWithUndefined<BaseTreeNode>;
  node: TypeWithUndefined<BaseTreeNode>;
}

interface FocusEventParams {
  node: TypeWithNull<BaseTreeNode>;
}

interface KeydownEvent {
  event: KeyboardEvent;
  node: BaseTreeNode;
}

type OnKeydownFunc = (event: KeyboardEvent, node: BaseTreeNode) => void;
type RenderNodeFunc = (node: BaseTreeNode) => JSX.Element;
type RenderIconFunc = (params: {
  node: BaseTreeNode;
  loading: boolean;
  expanded: boolean;
}) => JSX.Element;
type LoadDataFunc = (
  node: BaseTreeNode,
  callback: (children: TreeNodeOptions[]) => void
) => void;

type TreeContext = Readonly<{
  renderNode: TypeWithUndefined<RenderNodeFunc>;
  renderIcon: TypeWithUndefined<RenderIconFunc>;
  slots: Slots;
  expandedKeys: Set<NodeKey>;
  getSelectedNode: () => TypeWithUndefined<BaseTreeNode>;
  getCheckedNodes: () => BaseTreeNode[];
  getHalfCheckedNodes: () => BaseTreeNode[];
  getExpandedKeys: () => NodeKey[];
  toggleExpand: (nodeKey: NodeKey, state?: boolean) => void;
}>;

interface VirtualConfig {
  size: number;
  remain: number;
}

export type {
  BaseTreeNode,
  TreeNodeOptions,
  NodeKey,
  TreeNodeInstance,
  KeyNodeMap,
  EventParams,
  FocusEventParams,
  SelectEventParams,
  RenderNodeFunc,
  RenderIconFunc,
  LoadDataFunc,
  KeydownEvent,
  TreeContext,
  VirtualConfig,
};
