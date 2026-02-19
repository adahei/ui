<script setup lang="ts">
import { computed, inject, useId, useAttrs, watchEffect, type ComputedRef } from 'vue'
import { Check } from 'lucide-vue-next'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: boolean
  size?: Size
  label?: string
  disabled?: boolean
  error?: boolean | string
  id?: string
  name?: string
  value?: string | number
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  error: false,
  indeterminate: false,
})

const attrs = useAttrs()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:indeterminate': [value: boolean]
}>()

const generatedId = useId()
const checkboxId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

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
    return `${checkboxId.value}-error`
  }
  return undefined
})

const classes = computed(() => [
  'ui-checkbox',
  `ui-checkbox--${effectiveSize.value}`,
  {
    'ui-checkbox--checked': props.modelValue,
    'ui-checkbox--indeterminate': props.indeterminate,
    'ui-checkbox--error': hasError.value,
    'ui-checkbox--disabled': props.disabled,
  },
])

// Compute aria-checked for proper AT exposure of mixed state
const ariaChecked = computed(() => {
  if (props.indeterminate) return 'mixed'
  return props.modelValue ? 'true' : 'false'
})

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  // When clicking an indeterminate checkbox, clear indeterminate state
  if (props.indeterminate) {
    emit('update:indeterminate', false)
  }
  emit('update:modelValue', target.checked)
}

// Dev warnings for accessibility
if (import.meta.env.DEV) {
  watchEffect(() => {
    const hasAriaLabel = 'aria-label' in attrs || 'aria-labelledby' in attrs
    const hasLabel = !!props.label
    const insideFormField = !!formFieldId

    if (!hasAriaLabel && !hasLabel && !insideFormField) {
      console.warn(
        '[UiCheckbox] Checkbox without accessible label. Provide label prop, aria-label, or wrap in UiFormField.'
      )
    }
  })
}
</script>

<template>
  <label :class="classes">
    <span class="ui-checkbox__control">
      <input
        v-bind="$attrs"
        type="checkbox"
        :id="checkboxId"
        :name="name"
        :value="value"
        :checked="modelValue"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :aria-checked="ariaChecked"
        :aria-invalid="hasError"
        :aria-describedby="ariaDescribedBy"
        class="ui-checkbox__input"
        @change="onChange"
      />
      <span class="ui-checkbox__box" aria-hidden="true">
        <Check v-if="modelValue && !indeterminate" class="ui-checkbox__icon" />
        <span v-else-if="indeterminate" class="ui-checkbox__indeterminate" />
      </span>
    </span>
    <span v-if="label" class="ui-checkbox__label">{{ label }}</span>
    <slot />
  </label>
  <p v-if="errorMessage" :id="`${checkboxId}-error`" class="ui-checkbox__error" aria-live="polite">
    {{ errorMessage }}
  </p>
</template>

<style lang="scss" scoped>
.ui-checkbox {
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

    &:focus-visible + .ui-checkbox__box {
      box-shadow: var(--focus-ring);
    }
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--input-control-border);
    border-radius: var(--radius-sm);
    background-color: var(--input-control-bg);
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  &__icon {
    color: var(--input-control-indicator);
  }

  &__indeterminate {
    width: 60%;
    height: 2px;
    background-color: var(--input-control-indicator);
    border-radius: 1px;
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
  &:hover:not(.ui-checkbox--disabled) {
    .ui-checkbox__box {
      border-color: var(--input-control-border-hover);
    }
  }

  // Checked state
  &--checked,
  &--indeterminate {
    .ui-checkbox__box {
      background-color: var(--input-control-checked-bg);
      border-color: var(--input-control-checked-border);
    }

    &:hover:not(.ui-checkbox--disabled) {
      .ui-checkbox__box {
        background-color: var(--input-control-checked-bg-hover);
        border-color: var(--input-control-checked-bg-hover);
      }
    }
  }

  // Sizes
  &--sm {
    .ui-checkbox__box {
      width: 1rem;
      height: 1rem;
    }

    .ui-checkbox__icon {
      width: 0.75rem;
      height: 0.75rem;
    }

    .ui-checkbox__label {
      font-size: var(--text-sm);
      padding-top: 0;
    }
  }

  &--md {
    .ui-checkbox__box {
      width: 1.25rem;
      height: 1.25rem;
    }

    .ui-checkbox__icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .ui-checkbox__label {
      font-size: var(--text-sm);
      padding-top: 0.125rem;
    }
  }

  &--lg {
    .ui-checkbox__box {
      width: 1.5rem;
      height: 1.5rem;
    }

    .ui-checkbox__icon {
      width: 1rem;
      height: 1rem;
    }

    .ui-checkbox__label {
      font-size: var(--text-base);
      padding-top: 0.125rem;
    }
  }

  // Error state
  &--error {
    .ui-checkbox__box {
      border-color: var(--input-border-error);
    }

    &.ui-checkbox--checked,
    &.ui-checkbox--indeterminate {
      .ui-checkbox__box {
        background-color: var(--input-border-error);
        border-color: var(--input-border-error);
      }
    }
  }

  // Disabled state
  &--disabled {
    cursor: not-allowed;

    .ui-checkbox__box {
      opacity: 0.5;
      background-color: var(--input-bg-disabled);
    }

    .ui-checkbox__label {
      opacity: 0.5;
    }
  }
}
</style>
