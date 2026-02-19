<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Size } from '@/types'

interface Props {
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

// Provide size to child components
provide('inputGroupSize', props.size)

const classes = computed(() => [
  'ui-input-group',
  `ui-input-group--${props.size}`,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-input-group {
  display: flex;
  align-items: stretch;

  // Remove border-radius from middle children, keep on first/last
  :deep(> *) {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    &:last-child {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }
  }

  // Handle UiInput wrapper - need to target the field inside
  :deep(> .ui-input) {
    flex: 1;

    .ui-input__field {
      border-radius: 0;
    }

    &:first-child .ui-input__field {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    &:last-child .ui-input__field {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }
  }

  // Handle UiSelect wrapper - need to target the field inside
  :deep(> .ui-select) {
    flex: 1;

    .ui-select__field {
      border-radius: 0;
    }

    &:first-child .ui-select__field {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    &:last-child .ui-select__field {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }
  }

  // Handle adjacent borders - avoid double borders
  :deep(> * + *) {
    margin-left: -1px;
  }

  // Ensure focused element is on top
  :deep(> *:focus-within) {
    z-index: 1;
    position: relative;
  }

  // UiButton adjustments
  :deep(> .ui-button) {
    flex-shrink: 0;
  }

  // UiCheckbox and UiRadio - display inline with spacing
  // Use higher specificity to override the general > * + * rule
  :deep(> .ui-checkbox),
  :deep(> .ui-radio) {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    align-self: center; // Override stretch alignment
    padding: 0 var(--spacing-3);
    border-radius: 0 !important; // No border radius needed

    &:first-child {
      padding-left: var(--spacing-3);
    }

    &:last-child {
      padding-right: var(--spacing-3);
    }
  }

  // Reset negative margin for checkboxes/radios after other elements
  :deep(> .ui-checkbox),
  :deep(> .ui-radio),
  :deep(> .ui-checkbox + *),
  :deep(> .ui-radio + *) {
    margin-left: 0;
  }

  // UiDropdown - handle trigger styling within group
  :deep(> .ui-dropdown) {
    flex-shrink: 0;

    .ui-dropdown-trigger {
      border-radius: 0;
    }

    &:first-child .ui-dropdown-trigger {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    &:last-child .ui-dropdown-trigger {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }
  }
}
</style>
