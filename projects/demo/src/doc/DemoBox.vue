<template>
  <div class="demo-box">
    <div class="show">
      <slot />
    </div>
    <div class="meta">
      <div class="title">{{ title }}</div>
      <div class="desc">
        <p>{{ desc }}</p>
      </div>
      <!-- <div class="actions">
        <a-tooltip>
          <template #title>{{ toggleBtnLabel }}</template>
          <span class="act" @click="toggleExpand">
            <a><i class="iconfont iconcode"></i></a>
          </span>
        </a-tooltip>
        <a-typography-paragraph class="act" style="display: inline-block" :copyable="{ text: preCode.source }" />
      </div> -->

      <div class="actions">
        <a-tooltip>
          <template #title>查看代码</template>
          <span class="act">
            <a :href="href" target="_blank" style="margin-right: 10px;"><i class="iconfont iconcode"></i></a>
          </span>
        </a-tooltip>
        <a-tooltip>
          <template #title>在线编辑</template>
          <span class="act">
            <a :href="online" target="_blank">
              <edit-outlined />
            </a>
          </span>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'DemoBox',
  components: { EditOutlined },
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    codeType: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    online: {
      type: String,
      default: ''
    },
  }
});
</script>

<style scoped>
.demo-box {
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition: border-color .2s ease-in-out;
}

.demo-box:target {
  border-color: var(--primary-color);
}

.demo-box .show {
  padding: 20px 14px;
  border-bottom: 1px solid var(--border-color);
  max-height: 300px;
  overflow-y: auto;
}

.demo-box .meta {
  position: relative;
  border-radius: 0 0 2px 2px;
}

.demo-box .meta .title {
  position: absolute;
  top: -14px;
  margin-left: 16px;
  padding: 1px 8px;
  background-color: var(--white-color);
  border-radius: 2px 2px 0 0;
}

.demo-box .meta .desc {
  padding: 18px 24px 12px;
}

.demo-box .meta .actions {
  padding: 12px 0;
  border-top: 1px dashed var(--dash-border-color);
  opacity: .7;
  text-align: center;
  transition: opacity .3s;
  user-select: none;

}

.demo-box .meta .actions:hover {
  opacity: 1;
}

.demo-box .meta .actions .act {
  margin-right: 8px;
}


.demo-box .highlight-wrap {
  border-radius: 0 0 2px 2px;

}

.demo-box .highlight-wrap .highlight {
  padding: 16px 32px;
}
</style>
