<script setup lang="ts">
import { computed, useSlots, watchEffect, inject, type Component } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import type { Size, Variant } from '@/types'

interface Props {
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  active?: boolean
  block?: boolean
  iconLeft?: Component
  iconRight?: Component
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  active: false,
  block: false,
  type: 'button',
})

const slots = useSlots()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

const isDisabled = computed(() => props.disabled || props.loading)

const isIconOnly = computed(() => {
  const slotContent = slots.default?.()
  if (!slotContent) return true
  // Check if slot is empty or only whitespace
  return slotContent.every(
    (node) =>
      node.type === Comment ||
      (typeof node.children === 'string' && !node.children.trim())
  )
})

const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${effectiveSize.value}`,
  {
    'ui-button--disabled': isDisabled.value,
    'ui-button--loading': props.loading,
    'ui-button--active': props.active,
    'ui-button--block': props.block,
    'ui-button--icon-only': isIconOnly.value,
  },
])

// Warn if icon-only button lacks aria-label
if (import.meta.env.DEV) {
  watchEffect(() => {
    if (isIconOnly.value && !props.ariaLabel) {
      console.warn(
        '[UiButton] Icon-only button without aria-label. Provide aria-label for accessibility.'
      )
    }
  })
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-pressed="active || undefined"
    :aria-busy="loading"
    :aria-label="ariaLabel"
    :title="isIconOnly ? ariaLabel : undefined"
  >
    <Loader2 v-if="loading" class="ui-button__spinner" />
    <component
      :is="iconLeft"
      v-else-if="iconLeft"
      class="ui-button__icon ui-button__icon--left"
    />
    <span v-if="!isIconOnly" class="ui-button__content">
      <slot />
    </span>
    <component
      :is="iconRight"
      v-if="iconRight && !loading"
      class="ui-button__icon ui-button__icon--right"
    />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast);
  white-space: nowrap;
  user-select: none;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  // Sizes
  &--sm {
    height: 2rem; // 32px
    padding: 0 var(--spacing-2);
    font-size: var(--text-sm);
    gap: var(--spacing-1-5);
  }

  &--md {
    height: 2.5rem; // 40px
    padding: 0 var(--spacing-4);
    font-size: var(--text-sm);
  }

  &--lg {
    height: 2.75rem; // 44px - WCAG touch target
    padding: 0 var(--spacing-5);
    font-size: var(--text-base);
  }

  // Block (full width)
  &--block {
    width: 100%;
  }

  // Icon only (square)
  &--icon-only {
    aspect-ratio: 1;
    padding: 0;

    .ui-button__icon {
      width: 1.25em;
      height: 1.25em;
    }
  }

  // Variants
  &--primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);

    &:hover:not(:disabled) {
      background-color: var(--button-primary-bg-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-primary-bg-active);
    }

    &.ui-button--active {
      background-color: var(--button-primary-bg-selected);
    }
  }

  &--secondary {
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);

    &:hover:not(:disabled) {
      background-color: var(--button-secondary-bg-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-secondary-bg-active);
    }

    &.ui-button--active {
      background-color: var(--button-secondary-bg-selected);
    }
  }

  &--outline {
    background-color: var(--button-outline-bg);
    border-color: var(--button-outline-border);
    color: var(--button-outline-text);

    &:hover:not(:disabled) {
      background-color: var(--button-outline-bg-hover);
      border-color: var(--button-outline-border-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-outline-bg-active);
    }

    &.ui-button--active {
      background-color: var(--button-outline-bg-selected);
      border-color: var(--button-outline-border-selected);
    }
  }

  &--ghost {
    background-color: var(--button-ghost-bg);
    color: var(--button-ghost-text);

    &:hover:not(:disabled) {
      background-color: var(--button-ghost-bg-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-ghost-bg-active);
    }

    &.ui-button--active {
      background-color: var(--button-ghost-bg-selected);
    }
  }

  // States
  &--disabled,
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  // Icon styles
  &__icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  &__spinner {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    animation: spin 1s linear infinite;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
