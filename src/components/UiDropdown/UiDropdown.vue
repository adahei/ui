<script setup lang="ts">
import { ref, provide, useId, onMounted, onUnmounted, computed, inject } from 'vue'
import { dropdownContextKey, type DropdownPlacement } from './types'
import { useDisclosure } from '../../composables'
import type { Size } from '@/types'

interface Props {
  placement?: DropdownPlacement
  disabled?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  disabled: false,
})

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

const { isOpen, toggle: baseToggle, close } = useDisclosure()
const dropdownRef = ref<HTMLElement | null>(null)

const generatedId = useId()
const triggerId = `dropdown-trigger-${generatedId}`
const menuId = `dropdown-menu-${generatedId}`

function toggle() {
  if (!props.disabled) {
    baseToggle()
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
    // Return focus to trigger
    const trigger = dropdownRef.value?.querySelector(`#${triggerId}`) as HTMLElement
    trigger?.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})

provide(dropdownContextKey, {
  isOpen,
  toggle,
  close,
  triggerId,
  menuId,
})

// Provide size for child components
provide('dropdownSize', effectiveSize)

const classes = computed(() => [
  'ui-dropdown',
  `ui-dropdown--${props.placement}`,
  `ui-dropdown--${effectiveSize.value}`,
  {
    'ui-dropdown--open': isOpen.value,
    'ui-dropdown--disabled': props.disabled,
  },
])
</script>

<template>
  <div ref="dropdownRef" :class="classes">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-dropdown {
  position: relative;
  display: inline-flex;

  // Placement variations
  &--bottom-end {
    :deep(.ui-dropdown-menu) {
      left: auto;
      right: 0;
    }
  }

  &--top-start {
    :deep(.ui-dropdown-menu) {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: var(--spacing-1);
    }
  }

  &--top-end {
    :deep(.ui-dropdown-menu) {
      top: auto;
      bottom: 100%;
      left: auto;
      right: 0;
      margin-top: 0;
      margin-bottom: var(--spacing-1);
    }
  }
}
</style>
