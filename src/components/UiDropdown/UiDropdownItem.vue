<script setup lang="ts">
import { computed, inject, type Component } from 'vue'
import { dropdownContextKey } from './types'

interface Props {
  disabled?: boolean
  destructive?: boolean
  iconLeft?: Component
  iconRight?: Component
  href?: string
  to?: string | object
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  destructive: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const context = inject(dropdownContextKey)

// Determine what element/component to render
const componentIs = computed(() => {
  if (props.disabled) return 'span'
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const linkProps = computed(() => {
  if (props.disabled) return {}
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: 'button' }
})

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
    context?.close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.key === 'Enter' || event.key === ' ') && !props.disabled) {
    event.preventDefault()
    const target = event.target as HTMLElement
    target.click()
  }
}

const classes = computed(() => [
  'ui-dropdown-item',
  {
    'ui-dropdown-item--disabled': props.disabled,
    'ui-dropdown-item--destructive': props.destructive,
  },
])
</script>

<template>
  <component
    :is="componentIs"
    v-bind="linkProps"
    role="menuitem"
    :class="classes"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span v-if="iconLeft" class="ui-dropdown-item__icon" aria-hidden="true">
      <component :is="iconLeft" />
    </span>
    <span class="ui-dropdown-item__content">
      <slot />
    </span>
    <span v-if="iconRight" class="ui-dropdown-item__icon" aria-hidden="true">
      <component :is="iconRight" />
    </span>
  </component>
</template>

<style lang="scss" scoped>
.ui-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1;
  color: var(--text-primary);
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover:not(.ui-dropdown-item--disabled) {
    background-color: var(--bg-secondary);
  }

  &:focus-visible {
    outline: none;
    background-color: var(--bg-secondary);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--text-tertiary);

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__content {
    flex: 1;
  }

  // Disabled state
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Destructive variant
  &--destructive {
    color: var(--status-error);

    .ui-dropdown-item__icon {
      color: var(--status-error);
    }

    &:hover:not(.ui-dropdown-item--disabled) {
      background-color: var(--status-error-bg);
    }
  }
}
</style>
