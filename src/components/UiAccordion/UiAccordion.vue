<script setup lang="ts">
import { computed, provide } from 'vue'
import { accordionContextKey } from './types'

interface Props {
  modelValue?: (string | number)[]
  multiple?: boolean
  collapsible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: false,
  collapsible: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
}>()

const openItems = computed(() => props.modelValue)

function toggle(value: string | number) {
  const isOpen = openItems.value.includes(value)

  if (isOpen) {
    // Closing - check if collapsible allows it
    if (props.collapsible || openItems.value.length > 1) {
      emit('update:modelValue', openItems.value.filter(v => v !== value))
    }
  } else {
    // Opening
    if (props.multiple) {
      emit('update:modelValue', [...openItems.value, value])
    } else {
      emit('update:modelValue', [value])
    }
  }
}

provide(accordionContextKey, {
  openItems,
  toggle,
  multiple: props.multiple,
})
</script>

<template>
  <div class="ui-accordion">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-accordion {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--accordion-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
</style>
