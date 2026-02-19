<script setup lang="ts">
import { inject, computed } from 'vue'
import { tabsContextKey } from './types'

interface Props {
  value: string
}

const props = defineProps<Props>()

const context = inject(tabsContextKey)

if (!context) {
  throw new Error('[UiTabPanel] Must be used inside UiTabs')
}

const { activeTab, tabsId } = context

const isActive = computed(() => activeTab.value === props.value)
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :id="`${tabsId}-panel-${value}`"
    :aria-labelledby="`${tabsId}-trigger-${value}`"
    :tabindex="0"
    class="ui-tab-panel"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-tab-panel {
  padding: var(--spacing-4) 0;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-md);
  }
}
</style>
