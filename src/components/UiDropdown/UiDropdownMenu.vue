<script setup lang="ts">
import { inject, computed, ref, watch, nextTick, type ComputedRef } from 'vue'
import { dropdownContextKey } from './types'
import type { Size } from '@/types'

const context = inject(dropdownContextKey)

if (!context) {
  throw new Error('[UiDropdownMenu] Must be used inside UiDropdown')
}

const { isOpen, menuId, triggerId, close } = context
const size = inject<ComputedRef<Size>>('dropdownSize')

const menuRef = ref<HTMLElement | null>(null)

// Focus first item when menu opens
watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    const firstItem = menuRef.value?.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement
    firstItem?.focus()
  }
})

function handleKeydown(event: KeyboardEvent) {
  const items = Array.from(menuRef.value?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || []) as HTMLElement[]
  const currentIndex = items.findIndex(item => item === document.activeElement)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      items[nextIndex]?.focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      items[prevIndex]?.focus()
      break
    case 'Home':
      event.preventDefault()
      items[0]?.focus()
      break
    case 'End':
      event.preventDefault()
      items[items.length - 1]?.focus()
      break
    case 'Tab':
      // Close menu on tab out
      close()
      break
  }
}

const classes = computed(() => [
  'ui-dropdown-menu',
  `ui-dropdown-menu--${size?.value ?? 'md'}`,
])
</script>

<template>
  <Transition name="ui-dropdown-menu">
    <div
      v-if="isOpen"
      ref="menuRef"
      :id="menuId"
      role="menu"
      :aria-labelledby="triggerId"
      :class="classes"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.ui-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  min-width: 10rem;
  margin-top: var(--spacing-1);
  padding: var(--spacing-1);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);

  // Placement handled by parent

  // Sizes
  &--sm {
    min-width: 8rem;
  }

  &--lg {
    min-width: 12rem;
  }

  // Transition
  &-enter-active,
  &-leave-active {
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>
