<script setup lang="ts">
import { computed, inject, useId, useAttrs, watchEffect, type ComputedRef } from 'vue'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | number | null
  value: string | number
  size?: Size
  label?: string
  disabled?: boolean
  error?: boolean | string
  id?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  error: false,
})

const attrs = useAttrs()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const generatedId = useId()
const radioId = computed(() => props.id ?? `${formFieldId?.value ?? generatedId}-${props.value}`)

// Use form field error state if no explicit error prop, otherwise use prop
const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : null
)

const ariaDescribedBy = computed(() => {
  if (formFieldError?.value && formFieldId) {
    return `${formFieldId.value}-error`
  }
  if (errorMessage.value) {
    return `${radioId.value}-error`
  }
  return undefined
})

const isChecked = computed(() => props.modelValue === props.value)

const classes = computed(() => [
  'ui-radio',
  `ui-radio--${effectiveSize.value}`,
  {
    'ui-radio--checked': isChecked.value,
    'ui-radio--error': hasError.value,
    'ui-radio--disabled': props.disabled,
  },
])

function onChange() {
  emit('update:modelValue', props.value)
}

// Dev warnings for accessibility
if (import.meta.env.DEV) {
  watchEffect(() => {
    const hasAriaLabel = 'aria-label' in attrs || 'aria-labelledby' in attrs
    const hasLabel = !!props.label
    const insideFormField = !!formFieldId

    if (!hasAriaLabel && !hasLabel && !insideFormField) {
      console.warn(
        '[UiRadio] Radio without accessible label. Provide label prop, aria-label, or wrap in UiFormField.'
      )
    }
  })
}
</script>

<template>
  <label :class="classes">
    <span class="ui-radio__control">
      <input
        v-bind="$attrs"
        type="radio"
        :id="radioId"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :aria-invalid="hasError"
        :aria-describedby="ariaDescribedBy"
        class="ui-radio__input"
        @change="onChange"
      />
      <span class="ui-radio__circle" aria-hidden="true">
        <span v-if="isChecked" class="ui-radio__dot" />
      </span>
    </span>
    <span v-if="label" class="ui-radio__label">{{ label }}</span>
    <slot />
  </label>
  <p v-if="errorMessage" :id="`${radioId}-error`" class="ui-radio__error" aria-live="polite">
    {{ errorMessage }}
  </p>
</template>

<style lang="scss" scoped>
.ui-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  cursor: pointer;
  user-select: none;

  &__control {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // WCAG 2.2 SC 2.5.8: Minimum 24x24 target size
    min-width: 1.5rem;
    min-height: 1.5rem;
  }

  &__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    margin: 0;

    &:disabled {
      cursor: not-allowed;
    }

    &:focus-visible + .ui-radio__circle {
      box-shadow: var(--focus-ring);
    }
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--input-control-border);
    border-radius: var(--radius-full);
    background-color: var(--input-control-bg);
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  &__dot {
    border-radius: var(--radius-full);
    background-color: var(--input-control-indicator);
  }

  &__label {
    color: var(--text-primary);
    line-height: 1.4;
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: var(--spacing-1) 0 0;
  }

  // Hover state
  &:hover:not(.ui-radio--disabled) {
    .ui-radio__circle {
      border-color: var(--input-control-border-hover);
    }
  }

  // Checked state
  &--checked {
    .ui-radio__circle {
      background-color: var(--input-control-checked-bg);
      border-color: var(--input-control-checked-border);
    }

    &:hover:not(.ui-radio--disabled) {
      .ui-radio__circle {
        background-color: var(--input-control-checked-bg-hover);
        border-color: var(--input-control-checked-bg-hover);
      }
    }
  }

  // Sizes
  &--sm {
    .ui-radio__circle {
      width: 1rem;
      height: 1rem;
    }

    .ui-radio__dot {
      width: 0.375rem;
      height: 0.375rem;
    }

    .ui-radio__label {
      font-size: var(--text-sm);
      padding-top: 0;
    }
  }

  &--md {
    .ui-radio__circle {
      width: 1.25rem;
      height: 1.25rem;
    }

    .ui-radio__dot {
      width: 0.5rem;
      height: 0.5rem;
    }

    .ui-radio__label {
      font-size: var(--text-sm);
      padding-top: 0.125rem;
    }
  }

  &--lg {
    .ui-radio__circle {
      width: 1.5rem;
      height: 1.5rem;
    }

    .ui-radio__dot {
      width: 0.625rem;
      height: 0.625rem;
    }

    .ui-radio__label {
      font-size: var(--text-base);
      padding-top: 0.125rem;
    }
  }

  // Error state
  &--error {
    .ui-radio__circle {
      border-color: var(--input-border-error);
    }

    &.ui-radio--checked {
      .ui-radio__circle {
        background-color: var(--input-border-error);
        border-color: var(--input-border-error);
      }
    }
  }

  // Disabled state
  &--disabled {
    cursor: not-allowed;

    .ui-radio__circle {
      opacity: 0.5;
      background-color: var(--input-bg-disabled);
    }

    .ui-radio__label {
      opacity: 0.5;
    }
  }
}
</style>
