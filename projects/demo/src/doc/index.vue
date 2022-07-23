<template>
  <div class="doc-container">
    <section class="sec" id="usage">
      <a-typography-title :level="3">使用说明</a-typography-title>
      <a-card>
        <div class="install">
          <a-typography-title :level="4">安装</a-typography-title>
          <a-typography-paragraph>
            <pre>npm i @ysx-libs/vue-virtual-tree</pre>
          </a-typography-paragraph>
        </div>
        <div class="notice">
          <a-typography-title :level="4">必须要传size属性</a-typography-title>
          <a-typography-paragraph>
            由于虚拟组件要监听滚动事件，动态替换node节点，所以需要知道每个节点的高度，
            默认size=27，如果您要自定义渲染node或图标，那么务必将真实的size传进来，
            另外还有remain属性，控制高度，超出隐藏，默认remain = 8
            所以默认的tree.maxHeight = 27 * 8
          </a-typography-paragraph>
          <img src="./principle.png" alt="原理" />
        </div>
        <div class="custom-view">
          <a-typography-title :level="4">关于自定义样式</a-typography-title>
          <a-typography-paragraph>
            组件已经提供自定义node节点和图标的功能(见下面示例)，
            如果还有些样式需要更细致的修改，请自行用css覆盖
          </a-typography-paragraph>
        </div>
        <div class="custom-view">
          <a-typography-title :level="4">关于刷新整个tree</a-typography-title>
          <a-typography-paragraph>
            处于性能考虑，tree内部监听 source时，并没有开启 <b>deep</b>
            当你只改变source中的某个属性而view并未更新时，<b>可能需要改变source的引用，比如 list.value = list.value.slice()</b>
          </a-typography-paragraph>
        </div>
      </a-card>
    </section>
    <section class="sec mid">
      <a-typography-title :level="3">代码演示</a-typography-title>
      <a-row :gutter="16" class="demo-boxes">
        <a-col :span="12">
          <demo-box
            id="base-demo"
            title="基本用法"
            desc="展开、选中、禁用的基本功能"
            code-type="base"
            href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/BaseDemo.vue"
            online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FBaseDemo.vue">
            <base-demo />
          </demo-box>
          <demo-box
            id="async-dada-demo"
            title="异步加载数据"
            desc="点击展开节点，动态加载数据。"
            code-type="asyncData"
            href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/AsyncDataDemo.vue"
            online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FAsyncDataDemo.vue">
            <async-data-demo />
          </demo-box>
          <demo-box
            id="custom-icon-demo"
            title="自定义图标"
            desc="自定义展开、收起图标"
            code-type="customIcon"
             href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/CustomIconDemo.vue"
             online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FCustomIconDemo.vue">
            <custom-icon-demo />
          </demo-box>
          <demo-box
            id="search-demo"
            title="搜索树"
            desc="自行实现搜索功能"
            code-type="search"
             href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/SearchDemo.vue"
             online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src/doc/SearchDemo.vue">
            <search-demo />
          </demo-box>
        </a-col>
        <a-col :span="12">
          <demo-box
            id="checkbox-demo"
            title="可勾选"
            desc="showCheckbox属性开启勾选，默认父子节点联动，设置checkStrictly属性，可让父子节点不做联动"
            code-type="checkbox"
             href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/CheckboxDemo.vue"
             online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FCheckboxDemo.vue">
            <checkbox-demo />
          </demo-box>
          <demo-box
            id="custom-node-demo"
            title="自定义渲染节点"
            desc="绑定render函数或使用slot自定义节点，参数data为当前node数据。注意：如果改变了默认的高度(size), 需要传入size属性"
            code-type="customNode"
             href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/CustomNodeDemo.vue"
             online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FCustomNodeDemo.vue">
            <custom-node-demo />
          </demo-box>
          <demo-box
              id="virtual-demo"
              title="虚拟树"
              desc="传入 props.virtual 使用虚拟tree，高度为 size * remain"
              code-type="customNode"
               href="//github.com/lycHub/ysx-library/blob/master/projects/demo/src/doc/VirtualDemo.vue"
               online="//stackblitz.com/edit/vitejs-vite-1j17xa?file=src%2Fdoc%2FVirtualDemo.vue">
              <virtual-demo />
          </demo-box>
        </a-col>
      </a-row>
    </section>
    <section class="sec" id="api">
      <a-typography-title :level="3">API</a-typography-title>
      <a-typography-title :level="4">Props</a-typography-title>
      <a-table :columns="columns" :data-source="propData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">事件</a-typography-title>
      <a-table :columns="methodColumns" :data-source="eventData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">方法</a-typography-title>
      <a-table :columns="methodColumns" :data-source="methodData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">TreeNodeOptions</a-typography-title>
      <a-table
        :columns="columns"
        :data-source="nodeOptionData"
        rowKey="argument"
        :pagination="false"
        :row-class-name="rowClsName"
      />
      <br />
      <a-typography-title :level="4">Slots</a-typography-title>
      <a-table
        :columns="columns"
        :data-source="slotData"
        rowKey="argument"
        :pagination="false"
        :row-class-name="rowClsName"
      />
      <br />
      <a href="//github.com/lycHub/ysx-library/blob/master/projects/VirtualTree/src/tree/types.ts" target="_blank">类型定义</a>
    </section>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import DemoBox from './DemoBox.vue';
  import BaseDemo from './BaseDemo.vue';
  import CheckboxDemo from './CheckboxDemo.vue';
  import AsyncDataDemo from './AsyncDataDemo.vue';
  import CustomNodeDemo from './CustomNodeDemo.vue';
  import CustomIconDemo from './CustomIconDemo.vue';
  import VirtualDemo from './VirtualDemo.vue';
  import SearchDemo from './SearchDemo.vue';
  import { columns, eventData, methodColumns, methodData, nodeOptionData, propData, slotData } from './tableData';

  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo, CheckboxDemo, AsyncDataDemo, CustomNodeDemo, CustomIconDemo, VirtualDemo, SearchDemo },
    setup() {
      const rowClsName = (_: any, index: number) => ([5, 6, 7, 8].includes(index) ? 'table-row-abandoned' : null);

      return {
        propData,
        eventData,
        methodData,
        nodeOptionData,
        slotData,
        columns,
        methodColumns,
        rowClsName
      }
    }
  });
</script>

<style scoped>
  .doc-container {
    width: 1300px;
    margin: 0 auto;
    padding: 30px 20px;
    border: 1px solid var(--border-color);

  }

  .doc-container .sec {
    margin-bottom: 10px;
  }

  .doc-container .sec.mid {
    margin: 10px 0;
  }

  .doc-container .sec h3 {
    font-size: var(--font-size-huge);
  }

</style>
