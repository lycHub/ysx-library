<template>
  <div class="vir-tree-container">
vir-tree-container
<vir-checkbox v-model="checked" />
  </div>
</template>

<script setup lang="ts">
import VirCheckbox from './checkbox/index.vue';
const checked = $ref(false);
</script>

<style scoped lang="stylus">
</style>
