<script setup lang="ts">
import { computed, ref, watch, useId, useAttrs, watchEffect, inject, type Component, type ComputedRef } from 'vue'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | number | null
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  size?: Size
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean | string
  id?: string
  name?: string
  autocomplete?: string
  iconLeft?: Component
  iconRight?: Component
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
  block: false,
})

const attrs = useAttrs()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

// Use form field error state if no explicit error prop, otherwise use prop
const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : null
)

// Compute aria-describedby: prefer form field's error/hint, fallback to local error
const ariaDescribedBy = computed(() => {
  if (formFieldError?.value) {
    return `${inputId.value}-error`
  }
  if (errorMessage.value) {
    return `${inputId.value}-error`
  }
  return undefined
})

// Track focus state and local display value for number inputs
const isFocused = ref(false)
const localValue = ref('')

// Sync localValue from modelValue when not focused (for number inputs)
watch(
  () => props.modelValue,
  (newVal) => {
    if (props.type === 'number' && !isFocused.value) {
      localValue.value = newVal == null ? '' : String(newVal)
    }
  },
  { immediate: true }
)

// Compute the display value
const displayValue = computed(() => {
  if (props.type === 'number') {
    return isFocused.value ? localValue.value : (props.modelValue ?? '')
  }
  return props.modelValue ?? ''
})

const hasRightIcon = computed(() => !!props.iconRight)

const classes = computed(() => [
  'ui-input',
  `ui-input--${effectiveSize.value}`,
  {
    'ui-input--error': hasError.value,
    'ui-input--disabled': props.disabled,
    'ui-input--with-icon-left': !!props.iconLeft,
    'ui-input--with-icon-right': hasRightIcon.value,
    'ui-input--block': props.block,
  },
])

function onFocus() {
  isFocused.value = true
  if (props.type === 'number') {
    localValue.value = props.modelValue == null ? '' : String(props.modelValue)
  }
}

function onBlur() {
  isFocused.value = false
  // On blur, emit the final parsed value for number inputs
  if (props.type === 'number') {
    if (localValue.value === '') {
      emit('update:modelValue', null)
    } else {
      const num = Number(localValue.value)
      emit('update:modelValue', Number.isNaN(num) ? null : num)
    }
  }
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.type === 'number') {
    // Update local display value
    localValue.value = target.value
    // Emit valid numbers immediately, but don't emit for intermediate states
    if (target.value === '') {
      emit('update:modelValue', null)
    } else {
      const num = Number(target.value)
      if (!Number.isNaN(num)) {
        emit('update:modelValue', num)
      }
      // Don't emit for intermediate states like '-', '1e', '1.' - keep last valid value
    }
  } else {
    emit('update:modelValue', target.value)
  }
}

// Dev warnings for accessibility
if (import.meta.env.DEV) {
  watchEffect(() => {
    // Warn if input lacks accessible label (skip if inside form field with label)
    const hasAriaLabel = 'aria-label' in attrs || 'aria-labelledby' in attrs
    const insideFormField = !!formFieldId
    if (!hasAriaLabel && !props.id && !insideFormField) {
      console.warn(
        '[UiInput] Input without accessible label. Provide aria-label, aria-labelledby, use id with UiLabel, or wrap in UiFormField.'
      )
    }
  })
}
</script>

<template>
  <div :class="classes">
    <div class="ui-input__wrapper">
      <span v-if="iconLeft" class="ui-input__icon ui-input__icon--left" aria-hidden="true">
        <component :is="iconLeft" />
      </span>
      <input
        v-bind="$attrs"
        :id="inputId"
        :name="name"
        :type="type"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :aria-invalid="hasError"
        :aria-describedby="ariaDescribedBy"
        class="ui-input__field"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="hasRightIcon" class="ui-input__icon ui-input__icon--right" aria-hidden="true">
        <component :is="iconRight" />
      </span>
    </div>
    <p v-if="errorMessage" :id="`${inputId}-error`" class="ui-input__error" aria-live="polite">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

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

  &__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--input-icon-color);
    pointer-events: none;

    svg {
      width: 1em;
      height: 1em;
    }

    &--left {
      left: var(--spacing-3);
    }

    &--right {
      right: var(--spacing-3);
    }
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Sizes
  &--sm {
    .ui-input__field {
      height: 2rem;
      padding: 0 var(--spacing-3);
      font-size: var(--text-sm);
    }

    .ui-input__icon svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }

  &--md {
    .ui-input__field {
      height: 2.5rem;
      padding: 0 var(--spacing-3);
      font-size: var(--text-sm);
    }

    .ui-input__icon svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &--lg {
    .ui-input__field {
      height: 2.75rem;
      padding: 0 var(--spacing-4);
      font-size: var(--text-base);
    }

    .ui-input__icon svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  // With icons
  &--with-icon-left {
    &.ui-input--sm .ui-input__field {
      padding-left: calc(var(--spacing-3) + 0.875rem + var(--spacing-2));
    }

    &.ui-input--md .ui-input__field {
      padding-left: calc(var(--spacing-3) + 1rem + var(--spacing-2));
    }

    &.ui-input--lg .ui-input__field {
      padding-left: calc(var(--spacing-4) + 1.125rem + var(--spacing-2));
    }
  }

  &--with-icon-right {
    &.ui-input--sm .ui-input__field {
      padding-right: calc(var(--spacing-3) + 0.875rem + var(--spacing-2));
    }

    &.ui-input--md .ui-input__field {
      padding-right: calc(var(--spacing-3) + 1rem + var(--spacing-2));
    }

    &.ui-input--lg .ui-input__field {
      padding-right: calc(var(--spacing-4) + 1.125rem + var(--spacing-2));
    }
  }

  // Error state
  &--error {
    .ui-input__field {
      border-color: var(--input-border-error);

      &:focus {
        border-color: var(--input-border-error);
        box-shadow: 0 0 0 2px var(--input-bg), 0 0 0 4px var(--input-border-error);
      }
    }
  }

  // Disabled
  &--disabled {
    .ui-input__icon {
      opacity: 0.5;
    }
  }

  // Block (full width, grows in flex containers)
  &--block {
    width: 100%;
    flex: 1 1 0%;
    min-width: 0;
  }
}
</style>
