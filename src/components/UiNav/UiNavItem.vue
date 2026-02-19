<script setup lang="ts">
import { computed, inject, useAttrs, type Component } from 'vue'
import { navContextKey } from './types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  href?: string
  to?: string | object
  active?: boolean
  disabled?: boolean
  iconLeft?: Component
  iconRight?: Component
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
})

const attrs = useAttrs()

const navContext = inject(navContextKey)
const isVertical = computed(() => navContext?.orientation.value === 'vertical')

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

const classes = computed(() => [
  'ui-nav-item__link',
  {
    'ui-nav-item__link--active': props.active,
    'ui-nav-item__link--disabled': props.disabled,
    'ui-nav-item__link--vertical': isVertical.value,
    'ui-nav-item__link--horizontal': !isVertical.value,
  },
])
</script>

<template>
  <li class="ui-nav-item">
    <component
      :is="componentIs"
      v-bind="{ ...linkProps, ...attrs }"
      :class="classes"
      :aria-current="active ? 'page' : undefined"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : undefined"
    >
      <span v-if="iconLeft" class="ui-nav-item__icon" aria-hidden="true">
        <component :is="iconLeft" />
      </span>
      <span class="ui-nav-item__content">
        <slot />
      </span>
      <span v-if="iconRight" class="ui-nav-item__icon" aria-hidden="true">
        <component :is="iconRight" />
      </span>
    </component>
  </li>
</template>

<style lang="scss" scoped>
.ui-nav-item {
  &__link {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    width: 100%;
    padding: var(--spacing-2) var(--spacing-3);
    background: none;
    border: none;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: 1;
    color: var(--text-secondary);
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast);

    &:hover:not(.ui-nav-item__link--disabled) {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset var(--focus-ring);
    }

    // Vertical specific
    &--vertical {
      border-radius: var(--radius-md);
    }

    // Horizontal specific
    &--horizontal {
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-md);
      white-space: nowrap;
    }

    // Active state
    &--active {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 500;

      &.ui-nav-item__link--vertical {
        background-color: var(--interactive-primary);
        color: var(--text-inverse);

        &:hover {
          background-color: var(--interactive-primary-hover);
        }
      }

      &.ui-nav-item__link--horizontal {
        background-color: var(--bg-tertiary);
      }
    }

    // Disabled state
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__content {
    flex: 1;
    text-align: left;
  }
}
</style>
