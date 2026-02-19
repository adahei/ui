<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted, type ComputedRef, type Component } from 'vue'
import { tabsContextKey } from './types'
import { UiButton } from '@/components/UiButton'
import type { Size } from '@/types'

interface Props {
  value: string
  disabled?: boolean
  iconLeft?: Component
  iconRight?: Component
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const context = inject(tabsContextKey)

if (!context) {
  throw new Error('[UiTabTrigger] Must be used inside UiTabs')
}

const { activeTab, setActiveTab, registerTab, unregisterTab, tabsId } = context
const size = inject<ComputedRef<Size>>('tabListSize')

onMounted(() => {
  registerTab(props.value)
})

onUnmounted(() => {
  unregisterTab(props.value)
})

const isActive = computed(() => activeTab.value === props.value)

function handleClick() {
  if (!props.disabled) {
    setActiveTab(props.value)
  }
}
</script>

<template>
  <UiButton
    variant="ghost"
    :size="size ?? 'md'"
    :disabled="disabled"
    :active="isActive"
    :icon-left="iconLeft"
    :icon-right="iconRight"
    role="tab"
    :id="`${tabsId}-trigger-${value}`"
    :aria-selected="isActive"
    :aria-controls="`${tabsId}-panel-${value}`"
    :tabindex="isActive ? 0 : -1"
    :data-value="value"
    class="ui-tab-trigger"
    @click="handleClick"
  >
    <slot />
  </UiButton>
</template>

<style lang="scss" scoped>
.ui-tab-trigger {
  // Override ghost text color for inactive tabs
  color: var(--text-secondary);

  &:hover:not(:disabled) {
    color: var(--text-primary);
  }
}
</style>
