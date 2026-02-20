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
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  size: 'md',
  block: false,
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
    'ui-form-field--block': props.block,
  },
])
</script>

<template>
  <div :class="classes">
    <UiLabel
      v-if="label"
      :html-for="fieldId"
      :required="required"
      :size="size"
    >
      {{ label }}
    </UiLabel>
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
</template>

<style lang="scss" scoped>
.ui-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  &--block {
    width: 100%;
    flex: 1 1 0%;
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
