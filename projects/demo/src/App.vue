<template>
  <a-layout class="vue-tree-demo app-layout">
    <a-layout-header class="header">
      <h2 class="title">Vue virtual tree</h2>
      <a class="link" href="//github.com/lycHub/ysx-library/blob/master/projects/VirtualTree/README.md" target="_blank">github</a>
    </a-layout-header>
    <a-layout-content class="content">
      <doc-container />
      <a-anchor class="anchor">
        <a-anchor-link href="#usage" title="安装使用" />
        <a-anchor-link href="#base-demo" title="基本用法" />
        <a-anchor-link href="#checkbox-demo" title="可勾选" />
        <a-anchor-link href="#async-dada-demo" title="异步加载" />
        <a-anchor-link href="#custom-node-demo" title="自定义渲染节点" />
        <a-anchor-link href="#custom-icon-demo" title="自定义图标" />
        <a-anchor-link href="#virtual-demo" title="虚拟树" />
        <a-anchor-link href="#search-demo" title="搜索树" />
        <a-anchor-link href="#api" title="API" />
      </a-anchor>
    </a-layout-content>
    <a-layout-footer class="footer">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import DocContainer from './doc/index.vue';
  export default defineComponent({
    components: { DocContainer },
    setup() {
      return {
        selectedKeys: ref<string[]>(['2'])
      };
    },
  });
</script>
<style scoped>
  .app-layout {
    --top-bottom-height: 64px;
  }

    .app-layout .header {
      display: flex;
      align-items: center;
      color: var(--white-color);
      height: var(--top-bottom-height);
    }

    .app-layout .header .title {
      color: inherit;
      margin: 0;
    }
    .app-layout .header .link {
      margin-left: 20px;
      font-size: var(--font-size-mid);
    }
    .app-layout  .content {
      position: relative;
      min-height: calc(100vh - var(--top-bottom-height) * 2);
      background-color: var(--white-color);

    }
    .app-layout .content .anchor {
      position: absolute;
      right: 50px;
      top: 30px;
    }
    .app-layout .footer {
      text-align: center;
    }
</style>
