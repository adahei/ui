<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Size } from '@/types'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

interface Props {
  size?: Size
  orientation?: ButtonGroupOrientation
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  orientation: 'horizontal',
})

// Provide size to child buttons
provide('inputGroupSize', props.size)

const classes = computed(() => [
  'ui-button-group',
  `ui-button-group--${props.size}`,
  `ui-button-group--${props.orientation}`,
])
</script>

<template>
  <div :class="classes" role="group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-button-group {
  display: inline-flex;

  // Horizontal orientation (default)
  &--horizontal {
    flex-direction: row;

    // Remove border-radius from all children
    :deep(> *) {
      border-radius: 0;
    }

    // First child - left border radius
    :deep(> *:first-child) {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    // Last child - right border radius
    :deep(> *:last-child) {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }

    // Handle adjacent borders - avoid double borders
    :deep(> * + *) {
      margin-left: -1px;
    }
  }

  // Vertical orientation
  &--vertical {
    flex-direction: column;

    // Remove border-radius from all children
    :deep(> *) {
      border-radius: 0;
      width: 100%;
    }

    // First child - top border radius
    :deep(> *:first-child) {
      border-top-left-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
    }

    // Last child - bottom border radius
    :deep(> *:last-child) {
      border-bottom-left-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }

    // Handle adjacent borders - avoid double borders
    :deep(> * + *) {
      margin-top: -1px;
    }
  }

  // Ensure focused/hovered element is on top
  :deep(> *:focus-within),
  :deep(> *:hover) {
    z-index: 1;
    position: relative;
  }

  // UiButton adjustments
  :deep(> .ui-button) {
    flex-shrink: 0;
  }
}
</style>
