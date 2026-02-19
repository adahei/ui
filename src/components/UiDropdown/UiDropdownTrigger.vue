<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { dropdownContextKey } from './types'
import type { Size } from '@/types'

interface Props {
  asChild?: boolean
  showChevron?: boolean
}

withDefaults(defineProps<Props>(), {
  asChild: false,
  showChevron: true,
})

const context = inject(dropdownContextKey)

if (!context) {
  throw new Error('[UiDropdownTrigger] Must be used inside UiDropdown')
}

const { isOpen, toggle, triggerId, menuId } = context
const size = inject<ComputedRef<Size>>('dropdownSize')

const classes = computed(() => [
  'ui-dropdown-trigger',
  `ui-dropdown-trigger--${size?.value ?? 'md'}`,
  {
    'ui-dropdown-trigger--open': isOpen.value,
  },
])

function handleClick(event: MouseEvent) {
  event.stopPropagation()
  toggle()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
  if (event.key === 'ArrowDown' && !isOpen.value) {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <button
    v-if="!asChild"
    :id="triggerId"
    type="button"
    :class="classes"
    :aria-haspopup="true"
    :aria-expanded="isOpen"
    :aria-controls="menuId"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span class="ui-dropdown-trigger__content">
      <slot />
    </span>
    <ChevronDown v-if="showChevron" class="ui-dropdown-trigger__icon" aria-hidden="true" />
  </button>
  <slot v-else name="custom" :toggle="toggle" :is-open="isOpen" :trigger-id="triggerId" :menu-id="menuId" />
</template>

<style lang="scss" scoped>
.ui-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1;
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover:not(:disabled) {
    border-color: var(--border-secondary);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--border-focus);
    box-shadow: var(--focus-ring);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__content {
    flex: 1;
    text-align: left;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--text-tertiary);
    transition: transform var(--transition-fast);
  }

  &--open {
    border-color: var(--border-focus);

    .ui-dropdown-trigger__icon {
      transform: rotate(180deg);
    }
  }

  // Sizes
  &--sm {
    height: 2rem;
    padding: 0 var(--spacing-3);
    font-size: var(--text-sm);

    .ui-dropdown-trigger__icon {
      width: 0.875rem;
      height: 0.875rem;
    }
  }

  &--md {
    height: 2.5rem;
    padding: 0 var(--spacing-3);
    font-size: var(--text-sm);
  }

  &--lg {
    height: 2.75rem;
    padding: 0 var(--spacing-4);
    font-size: var(--text-base);

    .ui-dropdown-trigger__icon {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
}
</style>
