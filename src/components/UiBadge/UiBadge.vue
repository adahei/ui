<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { Size } from '@/types'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

interface Props {
  variant?: BadgeVariant
  size?: Size
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  dot: false,
})

const slots = useSlots()

const isDot = computed(() => props.dot || !slots.default)

const classes = computed(() => [
  'ui-badge',
  `ui-badge--${props.variant}`,
  `ui-badge--${props.size}`,
  {
    'ui-badge--dot': isDot.value,
  },
])
</script>

<template>
  <span :class="classes" role="status">
    <slot v-if="!isDot" />
  </span>
</template>

<style lang="scss" scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border-radius: 9999px;

  // Variants
  &--primary {
    background-color: var(--badge-primary-bg);
    color: var(--badge-primary-text);
  }

  &--secondary {
    background-color: var(--badge-secondary-bg);
    color: var(--badge-secondary-text);
  }

  &--success {
    background-color: var(--badge-success-bg);
    color: var(--badge-success-text);
  }

  &--warning {
    background-color: var(--badge-warning-bg);
    color: var(--badge-warning-text);
  }

  &--error {
    background-color: var(--badge-error-bg);
    color: var(--badge-error-text);
  }

  // Sizes with content
  &--sm {
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 var(--spacing-1-5);
    font-size: var(--text-xs);
  }

  &--md {
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 var(--spacing-2);
    font-size: var(--text-xs);
  }

  &--lg {
    min-width: 1.75rem;
    height: 1.75rem;
    padding: 0 var(--spacing-2);
    font-size: var(--text-sm);
  }

  // Dot mode (no content)
  &--dot {
    padding: 0;
    min-width: 0;

    &.ui-badge--sm {
      width: 0.5rem;
      height: 0.5rem;
    }

    &.ui-badge--md {
      width: 0.625rem;
      height: 0.625rem;
    }

    &.ui-badge--lg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
}
</style>
