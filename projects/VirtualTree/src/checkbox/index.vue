<template>
  <div  :class="rootCls" @click="handleClick">
      <div class="inner" />
      <div class="content"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    halfChecked: {
      type: Boolean,
      default: false
    },
  });

  const emit = defineEmits<{
    (e: 'change', value: boolean): void
    (e: 'update:modelValue', value: boolean): void
  }>();


  const rootCls = $computed(() => {
      let result = 'vir-checkbox';
      if (props.modelValue) {
        result += ' checked';
      } else if (props.halfChecked) {
        result += ' half-checked';
      }
      if (props.disabled) {
        result += ' disabled';
      }
      return result;
    });
    
    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
        emit('change', !props.modelValue);
      }
    }

</script>




