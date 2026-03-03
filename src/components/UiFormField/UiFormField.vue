<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import type { Size } from '@/types'
import UiLabel from '@/components/UiLabel/UiLabel.vue'

interface Props {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  size?: Size
  id?: string
  /** Display label and input on the same row */
  inline?: boolean
  /** Fixed width for the label when inline is true (in rem) */
  labelWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  size: 'md',
  inline: false,
  labelWidth: 7.5,
})

const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)

// Provide ID to child components (UiInput, UiInputGroup)
provide('formFieldId', fieldId)
provide('formFieldError', computed(() => !!props.error))

const hasError = computed(() => !!props.error)

const classes = computed(() => [
  'ui-form-field',
  `ui-form-field--${props.size}`,
  {
    'ui-form-field--error': hasError.value,
    'ui-form-field--inline': props.inline,
  },
])

const inlineStyles = computed(() =>
  props.inline ? { '--label-width': `${props.labelWidth}rem` } : undefined
)
</script>

<template>
  <div :class="classes" :style="inlineStyles">
    <UiLabel
      v-if="label"
      :html-for="fieldId"
      :required="required"
      :size="size"
      class="ui-form-field__label"
    >
      {{ label }}
    </UiLabel>
    <div class="ui-form-field__content">
      <div class="ui-form-field__control">
        <slot />
      </div>
      <p v-if="error" :id="`${fieldId}-error`" class="ui-form-field__error" aria-live="polite">
        {{ error }}
      </p>
      <p v-else-if="hint" :id="`${fieldId}-hint`" class="ui-form-field__hint">
        {{ hint }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  width: 100%;
  flex: 1 1 0%;
  min-width: 0;

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    flex: 1;
    min-width: 0;
  }

  &__control {
    display: flex;
    flex-direction: column;
  }

  &__error {
    color: var(--status-error);
    font-size: var(--text-sm);
    margin: 0;
  }

  &__hint {
    color: var(--text-tertiary);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Inline layout
  &--inline {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--spacing-3);

    .ui-form-field__label {
      flex-shrink: 0;
      width: var(--label-width);
      text-align: right;
      padding-top: var(--spacing-2);
    }
  }

  // Size variants for hint/error text
  &--sm {
    .ui-form-field__error,
    .ui-form-field__hint {
      font-size: var(--text-xs);
    }
  }

  &--lg {
    .ui-form-field__error,
    .ui-form-field__hint {
      font-size: var(--text-sm);
    }
  }
}
</style>
