<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { tabsContextKey } from './types'
import type { Size } from '@/types'

interface Props {
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const context = inject(tabsContextKey)

if (!context) {
  throw new Error('[UiTabList] Must be used inside UiTabs')
}

const { tabs, activeTab, setActiveTab } = context
const listRef = ref<HTMLElement | null>(null)

function handleKeydown(event: KeyboardEvent) {
  const currentIndex = tabs.value.indexOf(activeTab.value)
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      newIndex = currentIndex < tabs.value.length - 1 ? currentIndex + 1 : 0
      break
    case 'ArrowLeft':
      event.preventDefault()
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.value.length - 1
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = tabs.value.length - 1
      break
    default:
      return
  }

  const newTab = tabs.value[newIndex]
  if (newTab) {
    setActiveTab(newTab)
    // Focus the new tab trigger
    const trigger = listRef.value?.querySelector(`[data-value="${newTab}"]`) as HTMLElement
    trigger?.focus()
  }
}

// Provide size to child triggers
import { provide } from 'vue'
provide('tabListSize', computed(() => props.size))

const classes = computed(() => [
  'ui-tab-list',
  `ui-tab-list--${props.size}`,
])
</script>

<template>
  <div
    ref="listRef"
    role="tablist"
    :aria-label="$attrs['aria-label'] as string"
    :class="classes"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-tab-list {
  display: inline-flex;
  gap: var(--spacing-1);
  border-bottom: 1px solid var(--border-primary);
  padding-bottom: var(--spacing-1);

  &--sm {
    gap: var(--spacing-0-5);
  }

  &--lg {
    gap: var(--spacing-2);
  }
}
</style>
