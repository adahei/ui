<script setup lang="ts">
import { computed, inject, useId, useAttrs, watchEffect, type ComputedRef } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { Size } from '@/types'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
  disabled?: boolean
}

export type SelectOptionOrGroup = SelectOption | SelectOptionGroup

function isOptionGroup(option: SelectOptionOrGroup): option is SelectOptionGroup {
  return 'options' in option
}

interface Props {
  modelValue?: string | number | null
  options?: SelectOptionOrGroup[]
  size?: Size
  placeholder?: string
  disabled?: boolean
  error?: boolean | string
  id?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  disabled: false,
  error: false,
})

const attrs = useAttrs()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const generatedId = useId()
const selectId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

// Use form field error state if no explicit error prop, otherwise use prop
const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))

const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : null
)

// Fix #4: Use formFieldId for aria-describedby when inside form field
// This ensures the ID matches what UiFormField renders
const ariaDescribedBy = computed(() => {
  // When inside form field, reference the form field's error element
  if (formFieldError?.value && formFieldId) {
    return `${formFieldId.value}-error`
  }
  // When using local error message, reference local error element
  if (errorMessage.value) {
    return `${selectId.value}-error`
  }
  return undefined
})

const classes = computed(() => [
  'ui-select',
  `ui-select--${effectiveSize.value}`,
  {
    'ui-select--error': hasError.value,
    'ui-select--disabled': props.disabled,
    'ui-select--placeholder': props.modelValue === null || props.modelValue === '',
  },
])

// Build a map of option values to their original types for proper coercion
const optionValueTypes = computed(() => {
  const types = new Map<string, 'string' | 'number'>()

  function processOptions(options: SelectOptionOrGroup[]) {
    for (const option of options) {
      if (isOptionGroup(option)) {
        for (const groupOption of option.options) {
          types.set(String(groupOption.value), typeof groupOption.value as 'string' | 'number')
        }
      } else {
        types.set(String(option.value), typeof option.value as 'string' | 'number')
      }
    }
  }

  processOptions(props.options)
  return types
})

// Fix #3: Preserve original option value types instead of auto-coercing
function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const stringValue = target.value

  if (stringValue === '') {
    emit('update:modelValue', null)
    return
  }

  // Check if this value was originally a number in the options
  const originalType = optionValueTypes.value.get(stringValue)
  if (originalType === 'number') {
    emit('update:modelValue', Number(stringValue))
  } else {
    emit('update:modelValue', stringValue)
  }
}

// Fix #1 & #2: Forward select-specific attrs and check actual accessible name
const selectAttrs = computed(() => {
  // Filter out style and class which should stay on root element
  const { style, class: className, ...rest } = attrs
  return rest
})

// Dev warnings for accessibility
if (import.meta.env.DEV) {
  watchEffect(() => {
    const hasAriaLabel = 'aria-label' in attrs
    const hasAriaLabelledBy = 'aria-labelledby' in attrs
    const hasIdForExternalLabel = !!props.id
    const insideFormFieldWithLabel = !!formFieldId

    const hasAccessibleName = hasAriaLabel || hasAriaLabelledBy || hasIdForExternalLabel || insideFormFieldWithLabel

    if (!hasAccessibleName) {
      console.warn(
        '[UiSelect] Select without accessible label. Provide aria-label, aria-labelledby, id (for external <label>), or wrap in UiFormField with label prop.'
      )
    }
  })
}
</script>

<template>
  <div :class="classes">
    <select
      v-bind="selectAttrs"
      :id="selectId"
      :name="name"
      :value="modelValue ?? ''"
      :disabled="disabled"
      :aria-invalid="hasError"
      :aria-describedby="ariaDescribedBy"
      class="ui-select__field"
      @change="onChange"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <template v-for="option in options" :key="isOptionGroup(option) ? option.label : option.value">
        <optgroup
          v-if="isOptionGroup(option)"
          :label="option.label"
          :disabled="option.disabled"
        >
          <option
            v-for="groupOption in option.options"
            :key="groupOption.value"
            :value="groupOption.value"
            :disabled="groupOption.disabled"
          >
            {{ groupOption.label }}
          </option>
        </optgroup>
        <option
          v-else
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </template>
      <slot />
    </select>
    <span class="ui-select__icon" aria-hidden="true">
      <ChevronDown />
    </span>
    <p v-if="errorMessage" :id="`${selectId}-error`" class="ui-select__error" aria-live="polite">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ui-select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  position: relative;

  &__field {
    width: 100%;
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-family: var(--font-sans);
    cursor: pointer;
    appearance: none;
    padding-right: 2.5rem; // Space for icon
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);

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
  }

  &__icon {
    position: absolute;
    right: var(--spacing-3);
    pointer-events: none;
    color: var(--input-icon-color);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Placeholder state (no value selected)
  &--placeholder {
    .ui-select__field {
      color: var(--input-placeholder);
    }
  }

  // Sizes
  &--sm {
    .ui-select__field {
      height: 2rem;
      padding: 0 var(--spacing-3);
      padding-right: 2rem;
      font-size: var(--text-sm);
    }

    .ui-select__icon {
      top: 0.5rem;

      svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }
  }

  &--md {
    .ui-select__field {
      height: 2.5rem;
      padding: 0 var(--spacing-3);
      padding-right: 2.5rem;
      font-size: var(--text-sm);
    }

    .ui-select__icon {
      top: 0.75rem;
    }
  }

  &--lg {
    .ui-select__field {
      height: 2.75rem;
      padding: 0 var(--spacing-4);
      padding-right: 2.75rem;
      font-size: var(--text-base);
    }

    .ui-select__icon {
      top: 0.875rem;

      svg {
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  }

  // Error state
  &--error {
    .ui-select__field {
      border-color: var(--status-error);

      &:focus {
        border-color: var(--status-error);
        box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--status-error);
      }
    }
  }

  // Disabled
  &--disabled {
    .ui-select__icon {
      opacity: 0.5;
    }
  }
}
</style>
