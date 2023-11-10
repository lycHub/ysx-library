const columns = [
  {
    title: '参数',
    dataIndex: 'argument'
  },
  {
    title: '说明',
    dataIndex: 'description'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'defaultValue'
  },
  {
    title: '版本号',
    dataIndex: 'version'
  }
];
const methodColumns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '说明',
    dataIndex: 'description'
  },
  {
    title: '参数',
    dataIndex: 'type'
  },
  {
    title: '版本号',
    dataIndex: 'version'
  }
];

const propData = [
  {
    argument: 'size',
    description: '用于虚拟计算，每个节点的高度',
    type: 'number',
    defaultValue: 27
  },
  {
    argument: 'remain',
    description: '用于虚拟计算，可视区内显示多少个节点',
    type: 'number',
    defaultValue: 8
  },
  {
    argument: 'source',
    description: '数据源',
    type: 'TreeNodeOptions[]',
    defaultValue: '[]'
  },
  {
    argument: 'showCheckbox',
    description: '勾选模式',
    type: 'boolean',
    defaultValue: 'false'
  },
  {
    argument: 'checkStrictly',
    description: '勾选时，父子不联动',
    type: 'boolean',
    defaultValue: 'false'
  },
  {
    argument: 'loadData',
    description: '异步加载',
    type: 'LoadDataFunc',
    defaultValue: 'undefined'
  },
  {
    argument: 'renderNode',
    description: '自定义渲染节点',
    type: 'RenderNodeFunc',
    defaultValue: 'undefined'
  },
  {
    argument: 'renderIcon',
    description: '自定义渲染节点',
    type: 'RenderIconFunc',
    defaultValue: 'undefined'
  },
  {
    argument: 'defaultExpandedKeys',
    description: '默认展开的nodeKey数组',
    type: 'NodeKey[]',
    defaultValue: '[]'
  },
  {
    argument: 'defaultDisabledKeys',
    description: '默认禁用的nodeKey数组',
    type: 'NodeKey[]',
    defaultValue: '[]'
  },
  {
    argument: 'defaultCheckedKeys',
    description: '默认勾选的nodeKey数组',
    type: 'NodeKey[]',
    defaultValue: '[]'
  },
  {
    argument: 'defaultSelectedKey',
    description: '默认选中的nodeKey',
    type: 'NodeKey',
    defaultValue: ''
  },
  {
    argument: 'virtual',
    description: '虚拟树配置，传入则表示开启虚拟树, size是每个node高度，remain是显示多少个node, 滚动高度 = size * remain',
    type: 'VirtualConfig',
    defaultValue: ''
  },
];
const eventData = [
  {
    name: 'selectChange',
    description: '选择节点时触发',
    type: 'SelectEventParams，preSelectedNode和node分别是之前选中和当前选中的节点'
  },
  {
    name: 'checkChange',
    description: '勾选节点时触发',
    type: 'EventParams'
  },
  {
    name: 'toggleExpand',
    description: '展开收起时触发',
    type: 'EventParams'
  }
];
const methodData = [
  {
    name: 'getSelectedNode',
    description: '获取选中的节点',
    type: '() => BaseTreeNode | undefined'
  },
  {
    name: 'getCheckedNodes',
    description: '获取已勾选的节点',
    type: '() => BaseTreeNode[]'
  },
  {
    name: 'getHalfCheckedNodes',
    description: '获取半勾选的节点',
    type: '() => BaseTreeNode[]'
  },
  {
    name: 'getExpandedKeys',
    description: '获取已展开的nodeKeys',
    type: '() => NodeKey[]'
  }
];
const nodeOptionData = [
  {
    argument: 'nodeKey',
    description: '必传，节点的唯一标识',
    type: 'string | number'
  },
  {
    argument: 'name',
    description: '必传，显示的节点名称',
    type: 'string'
  },
  {
    argument: 'hasChildren',
    description: '懒加载时必传，用于控制展开图标的显示和触发懒加载',
    type: 'boolean'
  },
  {
    argument: 'showCheckbox',
    description: '是否显示checkbox, 优先级高于tree.showCheckbox',
    type: 'boolean'
  },
  {
    argument: 'children',
    description: '子集',
    type: 'TreeNodeOptions[]',
    defaultValue: '[]'
  }
];

const slotData = [
  {
    argument: 'node',
    description: '自定义节点',
    type: 'RenderNodeFunc'
  },
  {
    argument: 'icon',
    description: '自定义图标',
    type: 'RenderIconFunc'
  },

];

export { columns, methodColumns, propData, eventData, methodData, nodeOptionData, slotData };
