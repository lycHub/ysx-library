<template>
  <div class="vir-tree">
vir-tree-container
<vir-checkbox v-model="checked">abc</vir-checkbox>
  </div>
</template>

<script setup lang="ts">
import VirCheckbox from './checkbox/index.vue';
const checked = $ref(false);
</script>

<style scoped lang="stylus">
</style>
