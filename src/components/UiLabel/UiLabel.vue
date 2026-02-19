<script setup lang="ts">
import type { Size } from '@/types'

interface Props {
  htmlFor?: string
  required?: boolean
  size?: Size
}

withDefaults(defineProps<Props>(), {
  required: false,
  size: 'md',
})
</script>

<template>
  <label :for="htmlFor" :class="['ui-label', `ui-label--${size}`]">
    <slot />
    <span v-if="required" class="ui-label__required" aria-hidden="true">*</span>
  </label>
</template>

<style lang="scss" scoped>
.ui-label {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  color: var(--text-primary);

  &--sm {
    font-size: var(--text-xs);
  }

  &--md {
    font-size: var(--text-sm);
  }

  &--lg {
    font-size: var(--text-base);
  }

  &__required {
    color: var(--status-error);
    font-weight: var(--font-normal);
  }
}
</style>
