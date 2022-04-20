<template>
  <div class="demo-box">
    <div class="form-item" style="width: 206px;">
      value: {{ value }}
      <vir-checkbox v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import VirCheckbox from './index.vue';

  export default defineComponent({
    name: 'CheckboxDemo',
    components: { VirCheckbox },
    setup(props, context) {
      const value = ref(false);
      return {
        value
      }
    }
  });
</script>
