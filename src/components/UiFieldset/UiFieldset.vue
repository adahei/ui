<script setup lang="ts">
import { computed } from 'vue'
import UiStack from '../UiStack/UiStack.vue'

export type FieldsetVariant = 'default' | 'plain'

interface Props {
  /** Legend text for the fieldset */
  legend: string
  /** Disable all fields in the group */
  disabled?: boolean
  /** Visual variant */
  variant?: FieldsetVariant
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'default',
})

const classes = computed(() => [
  'ui-fieldset',
  `ui-fieldset--${props.variant}`,
  {
    'ui-fieldset--disabled': props.disabled,
  },
])
</script>

<template>
  <fieldset :class="classes" :disabled="disabled">
    <legend class="ui-fieldset__legend">{{ legend }}</legend>
    <UiStack gap="2">
      <slot />
    </UiStack>
  </fieldset>
</template>

<style lang="scss" scoped>
.ui-fieldset {
  margin: 0;
  padding: 0;
  border: none;
  min-width: 0;

  &__legend {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    padding: 0;
    margin-bottom: var(--spacing-3);
  }

  // Default variant - with border
  &--default {
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-3);

    .ui-fieldset__legend {
      padding: 0 var(--spacing-2);
      margin-left: calc(-1 * var(--spacing-1));
    }
  }

  // Plain variant - no border
  &--plain {
    padding: 0;
  }

  // Disabled state
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .ui-fieldset__legend {
      color: var(--text-tertiary);
    }
  }
}
</style>
