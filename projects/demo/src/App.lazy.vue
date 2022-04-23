
<template>
  App
  <div class="btn">
    <button @click="getExpandedKeys">获取展开节点</button>
    <button @click="getSelectedNode">获取选中节点</button>
    <button @click="getCheckedNodes">获取勾选节点</button>
    <button @click="getHalfCheckedNodes">获取半选节点</button>
  </div>
  <VirTree
    ref="virTree"
    :source="list"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :load-data="loadData"
    :default-disabled-keys="defaultDisabledKeys"
    :default-selected-key="defaultSelectedKey"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
    @expand-change="expandChange"
    @select-change="selectChange"
    @check-change="checkChange"
  />
</template>

<script setup lang="tsx">
  import { onMounted } from 'vue';
  import { BaseTreeNode, EventParams, SelectEventParams, TreeContext, TreeNodeOptions, VirTree } from '@ysx/vue-virtual-tree';

  function recursion(path = '0', level = 3, h = 6): TreeNodeOptions[] {
      const list = [];
      for (let i = 0; i < h; i += 1) {
        const nodeKey = `${path}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true
        };

        if (level > 0) {
          // treeNode.children = recursion(nodeKey, level - 1);
        }
        list.push(treeNode);
      }
      return list;
    }

    const showCheckbox = true;
    const checkStrictly = false;


    let list = $ref(recursion());
    let defaultDisabledKeys = $ref(['0-3-1']);
    let defaultSelectedKey = $ref('');
    let defaultExpandedKeys = $ref(['0-1-1']);
    let defaultCheckedKeys = $ref<string[]>(['0-1-0', '0-1-1', '0-1-2', '0-1-3', '0-2-1', '0-2-0-0']);
    // let defaultCheckedKeys = $ref<string[]>(['0-1', '0-4']);
    setTimeout(() => {
      // defaultExpandedKeys = [];
      // defaultCheckedKeys = ['0-2'];
      // list = recursion('0', 3, 4);
    }, 2000)
    onMounted(() => {
      
    });


    function loadData(node: BaseTreeNode, callback: (children: TreeNodeOptions[]) => void) {
        const result: TreeNodeOptions[] = [];
        for (let i = 0; i < 2; i += 1) {
          const nodeKey = `${node.key}-${i}`;
          const treeNode: TreeNodeOptions  = {
            nodeKey,
            name: nodeKey,
            children: [],
            hasChildren: true
          };
          result.push(treeNode);
        }
        setTimeout(() => {
          callback(result);
        }, 500);
      }

    function renderNode(node: BaseTreeNode) {
      console.log('node :>> ', node);
      return <div style="padding: 0 4px;"><b style="color: #f60;">{ node.name }</b></div>
    }


    function expandChange(arg: EventParams) {
        console.log('expandChange :>> ', arg);
      }
      function selectChange(arg: SelectEventParams) {
        console.log('selectChange :>> ', arg);
      }
      function checkChange(arg: EventParams) {
        console.log('checkChange :>> ', arg);
      }
     
      // 
      const virTree = $ref<TreeContext>();
      const getExpandedKeys = () => {
        console.log('getExpandedKeys :>> ');
		    const keys = virTree!.getExpandedKeys();
        console.log('expanded keys', keys);
      }
      
      const getSelectedNode = () => {
		    const node = virTree!.getSelectedNode();
        console.log('selected node', node);
      }
      const getCheckedNodes = () => {
		    const node = virTree!.getCheckedNodes();
        console.log('checked nodes', node);
      }
      const getHalfCheckedNodes = () => {
		    const node = virTree!.getHalfCheckedNodes();
        console.log('half checked nodes', node);
      }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
