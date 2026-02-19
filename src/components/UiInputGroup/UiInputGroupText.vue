<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Size } from '@/types'

interface Props {
  size?: Size
}

const props = defineProps<Props>()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size>('inputGroupSize', 'md')
const effectiveSize = computed(() => props.size ?? injectedSize)

const classes = computed(() => [
  'ui-input-group-text',
  `ui-input-group-text--${effectiveSize.value}`,
])
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.ui-input-group-text {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  color: var(--text-secondary);
  white-space: nowrap;

  // Icons
  :deep(svg) {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  // Sizes
  &--sm {
    padding: 0 var(--spacing-2);
    font-size: var(--text-sm);
    min-width: 2rem;
  }

  &--md {
    padding: 0 var(--spacing-3);
    font-size: var(--text-sm);
    min-width: 2.5rem;
  }

  &--lg {
    padding: 0 var(--spacing-4);
    font-size: var(--text-base);
    min-width: 2.75rem;
  }
}
</style>
