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

export type { TreeNodeOptions, NodeKey, TreeInstance, TreeNodeInstance };
