<script setup lang="ts">
import { ref, provide, useId, watch } from 'vue'
import { tabsContextKey } from './types'

interface Props {
  modelValue?: string
  defaultValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const tabsId = `tabs-${generatedId}`

const tabs = ref<string[]>([])

// Use modelValue if provided (controlled), otherwise use internal state
const activeTab = ref(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeTab.value = newValue
  }
})

function setActiveTab(value: string) {
  activeTab.value = value
  emit('update:modelValue', value)
}

function registerTab(value: string) {
  if (!tabs.value.includes(value)) {
    tabs.value.push(value)
    // Auto-select first tab if none selected
    if (!activeTab.value && tabs.value.length === 1) {
      setActiveTab(value)
    }
  }
}

function unregisterTab(value: string) {
  const index = tabs.value.indexOf(value)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

provide(tabsContextKey, {
  activeTab,
  setActiveTab,
  registerTab,
  unregisterTab,
  tabs,
  tabsId,
})
</script>

<template>
  <div class="ui-tabs">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-tabs {
  display: flex;
  flex-direction: column;
}
</style>
