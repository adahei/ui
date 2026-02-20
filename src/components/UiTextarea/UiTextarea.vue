<script setup lang="ts">
import { computed, useId, useAttrs, watchEffect, inject, type ComputedRef } from 'vue'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | null
  size?: Size
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean | string
  id?: string
  name?: string
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  error: false,
  rows: 3,
  resize: 'vertical',
})

const attrs = useAttrs()

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const generatedId = useId()
const textareaId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

// Use form field error state if no explicit error prop, otherwise use prop
const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : null
)

// Compute aria-describedby: prefer form field's error/hint, fallback to local error
const ariaDescribedBy = computed(() => {
  if (formFieldError?.value && formFieldId) {
    return `${formFieldId.value}-error`
  }
  if (errorMessage.value) {
    return `${textareaId.value}-error`
  }
  return undefined
})

const classes = computed(() => [
  'ui-textarea',
  `ui-textarea--${props.size ?? 'md'}`,
  {
    'ui-textarea--error': hasError.value,
    'ui-textarea--disabled': props.disabled,
  },
])

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value || null)
}

// Dev warnings for accessibility
if (import.meta.env.DEV) {
  watchEffect(() => {
    const hasAriaLabel = 'aria-label' in attrs || 'aria-labelledby' in attrs
    const insideFormField = !!formFieldId
    if (!hasAriaLabel && !props.id && !insideFormField) {
      console.warn(
        '[UiTextarea] Textarea without accessible label. Provide aria-label, aria-labelledby, use id with UiLabel, or wrap in UiFormField.'
      )
    }
  })
}
</script>

<template>
  <div :class="classes">
    <textarea
      v-bind="$attrs"
      :id="textareaId"
      :name="name"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :aria-invalid="hasError"
      :aria-describedby="ariaDescribedBy"
      class="ui-textarea__field"
      :style="{ resize }"
      @input="onInput"
    />
    <p v-if="errorMessage" :id="`${textareaId}-error`" class="ui-textarea__error" aria-live="polite">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ui-textarea {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  width: 100%;

  &__field {
    width: 100%;
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-family: var(--font-sans);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);

    &::placeholder {
      color: var(--input-placeholder);
    }

    &:hover:not(:disabled):not(:focus) {
      border-color: var(--input-border-hover);
    }

    &:focus {
      outline: none;
      border-color: var(--input-border-focus);
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--input-bg-disabled);
    }

    &:read-only {
      background-color: var(--input-bg-disabled);
    }
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Sizes - affects padding and font-size
  &--sm {
    .ui-textarea__field {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--text-sm);
    }
  }

  &--md {
    .ui-textarea__field {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--text-sm);
    }
  }

  &--lg {
    .ui-textarea__field {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--text-base);
    }
  }

  // Error state
  &--error {
    .ui-textarea__field {
      border-color: var(--input-border-error);

      &:focus {
        border-color: var(--input-border-error);
        box-shadow: 0 0 0 2px var(--input-bg), 0 0 0 4px var(--input-border-error);
      }
    }
  }

  // Disabled
  &--disabled {
    .ui-textarea__field {
      opacity: 0.5;
    }
  }
}
</style>
