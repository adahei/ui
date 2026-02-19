<script setup lang="ts">
import { computed, inject, useId, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { accordionContextKey } from './types'

interface Props {
  value: string | number
  title?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const context = inject(accordionContextKey)

if (!context) {
  throw new Error('[UiAccordionItem] Must be used inside UiAccordion')
}

// TypeScript narrowing helper - context is guaranteed to exist after the throw
const { openItems, toggle: contextToggle } = context

const generatedId = useId()
const headerId = `accordion-header-${generatedId}`
const panelId = `accordion-panel-${generatedId}`

const isOpen = computed(() => openItems.value.includes(props.value))

// Track content height for animation
const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

watch(isOpen, (open) => {
  if (open && contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
}, { flush: 'post' })

function toggle() {
  if (!props.disabled) {
    contextToggle(props.value)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}

const classes = computed(() => [
  'ui-accordion-item',
  {
    'ui-accordion-item--open': isOpen.value,
    'ui-accordion-item--disabled': props.disabled,
  },
])
</script>

<template>
  <div :class="classes">
    <h3 class="ui-accordion-item__header">
      <button
        :id="headerId"
        type="button"
        class="ui-accordion-item__trigger"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
      >
        <span class="ui-accordion-item__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <ChevronDown class="ui-accordion-item__icon" aria-hidden="true" />
      </button>
      <div v-if="$slots.actions" class="ui-accordion-item__actions" @click.stop>
        <slot name="actions" :is-open="isOpen" />
      </div>
    </h3>
    <div
      :id="panelId"
      role="region"
      :aria-labelledby="headerId"
      class="ui-accordion-item__panel"
      :style="{ '--content-height': `${contentHeight}px` }"
    >
      <div ref="contentRef" class="ui-accordion-item__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-accordion-item {
  &:not(:last-child) {
    border-bottom: 1px solid var(--accordion-divider);
  }

  &__header {
    margin: 0;
    display: flex;
    align-items: stretch;
  }

  &__actions {
    display: flex;
    align-items: stretch;
    flex-shrink: 0;
    border-left: 1px solid var(--accordion-divider);

    // Force buttons inside to be full height and outline style
    :deep(.ui-button) {
      height: 100%;
      min-width: 3rem;
      padding-inline: var(--spacing-3);
      border-radius: 0;
      border: none;
      background: transparent;
      color: var(--text-secondary);

      &:hover:not(:disabled) {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
      }

      &:focus-visible {
        box-shadow: inset var(--focus-ring);
      }
    }
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    padding: var(--spacing-4);
    background-color: var(--accordion-trigger-bg);
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 500;
    line-height: 1;
    color: var(--accordion-trigger-text);
    text-align: left;
    transition: background-color var(--transition-fast);

    &:hover:not(:disabled) {
      background-color: var(--accordion-trigger-bg-hover);
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset var(--focus-ring);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__title {
    flex: 1;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--accordion-icon-color);
    transition: transform var(--transition-normal);
  }

  &__panel {
    display: grid;
    grid-template-rows: 0fr;
    background-color: var(--accordion-content-bg);
    transition: grid-template-rows var(--transition-normal);
  }

  &__content {
    overflow: hidden;
    padding: 0 var(--spacing-4);
    color: var(--accordion-content-text);
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  // Open state
  &--open {
    .ui-accordion-item__icon {
      transform: rotate(180deg);
    }

    .ui-accordion-item__panel {
      grid-template-rows: 1fr;
    }

    .ui-accordion-item__content {
      padding: var(--spacing-4);
      padding-top: 0;
    }
  }

  // Disabled state
  &--disabled {
    .ui-accordion-item__trigger {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
