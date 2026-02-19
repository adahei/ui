<script setup lang="ts">
import { computed, inject, useId, type ComputedRef } from 'vue'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  size?: Size
  disabled?: boolean
  error?: boolean | string
  showValue?: boolean
  id?: string
  name?: string
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  error: false,
  showValue: false,
  block: false,
})

// Get size from parent input group if not explicitly set
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

// Get ID and error state from parent form field if available
const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const generatedId = useId()
const sliderId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

// Use form field error state if no explicit error prop
const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : null
)

const ariaDescribedBy = computed(() => {
  if (errorMessage.value) {
    return `${sliderId.value}-error`
  }
  return undefined
})

// Calculate percentage for track fill
const percentage = computed(() => {
  const range = props.max - props.min
  if (range === 0) return 0
  return ((props.modelValue - props.min) / range) * 100
})

const classes = computed(() => [
  'ui-slider',
  `ui-slider--${effectiveSize.value}`,
  {
    'ui-slider--error': hasError.value,
    'ui-slider--disabled': props.disabled,
    'ui-slider--block': props.block,
  },
])

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}
</script>

<template>
  <div :class="classes">
    <div class="ui-slider__track-wrapper">
      <input
        v-bind="$attrs"
        type="range"
        :id="sliderId"
        :name="name"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-invalid="hasError"
        :aria-describedby="ariaDescribedBy"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        class="ui-slider__input"
        :style="{ '--slider-percentage': `${percentage}%` }"
        @input="onInput"
      />
      <span v-if="showValue" class="ui-slider__value" aria-hidden="true">{{ modelValue }}</span>
    </div>
    <p v-if="errorMessage" :id="`${sliderId}-error`" class="ui-slider__error" aria-live="polite">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ui-slider {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  &__track-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  &__value {
    flex-shrink: 0;
    min-width: 2.5rem;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  &__input {
    width: 100%;
    margin: 0;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;

    // Track styling
    &::-webkit-slider-runnable-track {
      width: 100%;
      background: linear-gradient(
        to right,
        var(--input-control-checked-bg) 0%,
        var(--input-control-checked-bg) var(--slider-percentage, 0%),
        var(--input-control-border) var(--slider-percentage, 0%),
        var(--input-control-border) 100%
      );
      border-radius: var(--radius-full);
      transition: background var(--transition-fast);
    }

    &::-moz-range-track {
      width: 100%;
      background: var(--input-control-border);
      border-radius: var(--radius-full);
    }

    &::-moz-range-progress {
      background: var(--input-control-checked-bg);
      border-radius: var(--radius-full);
    }

    // Thumb styling
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--bg-primary);
      border: 2px solid var(--input-control-checked-bg);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        border-color var(--transition-fast);
    }

    &::-moz-range-thumb {
      background-color: var(--bg-primary);
      border: 2px solid var(--input-control-checked-bg);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        border-color var(--transition-fast);
    }

    // Hover state
    &:hover:not(:disabled) {
      &::-webkit-slider-thumb {
        transform: scale(1.1);
      }

      &::-moz-range-thumb {
        transform: scale(1.1);
      }
    }

    // Focus state
    &:focus {
      outline: none;
    }

    &:focus-visible {
      &::-webkit-slider-thumb {
        box-shadow: var(--focus-ring);
      }

      &::-moz-range-thumb {
        box-shadow: var(--focus-ring);
      }
    }

    // Disabled state
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;

      &::-webkit-slider-thumb {
        cursor: not-allowed;
      }

      &::-moz-range-thumb {
        cursor: not-allowed;
      }
    }
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Sizes
  &--sm {
    .ui-slider__input {
      height: 1.5rem;

      &::-webkit-slider-runnable-track {
        height: 4px;
      }

      &::-moz-range-track {
        height: 4px;
      }

      &::-webkit-slider-thumb {
        width: 14px;
        height: 14px;
        margin-top: -5px;
      }

      &::-moz-range-thumb {
        width: 14px;
        height: 14px;
      }
    }
  }

  &--md {
    .ui-slider__input {
      height: 2rem;

      &::-webkit-slider-runnable-track {
        height: 6px;
      }

      &::-moz-range-track {
        height: 6px;
      }

      &::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        margin-top: -6px;
      }

      &::-moz-range-thumb {
        width: 18px;
        height: 18px;
      }
    }
  }

  &--lg {
    .ui-slider__input {
      height: 2.5rem;

      &::-webkit-slider-runnable-track {
        height: 8px;
      }

      &::-moz-range-track {
        height: 8px;
      }

      &::-webkit-slider-thumb {
        width: 22px;
        height: 22px;
        margin-top: -7px;
      }

      &::-moz-range-thumb {
        width: 22px;
        height: 22px;
      }
    }
  }

  // Error state
  &--error {
    .ui-slider__input {
      &::-webkit-slider-runnable-track {
        background: linear-gradient(
          to right,
          var(--input-border-error) 0%,
          var(--input-border-error) var(--slider-percentage, 0%),
          var(--input-control-border) var(--slider-percentage, 0%),
          var(--input-control-border) 100%
        );
      }

      &::-moz-range-progress {
        background: var(--input-border-error);
      }

      &::-webkit-slider-thumb {
        border-color: var(--input-border-error);
      }

      &::-moz-range-thumb {
        border-color: var(--input-border-error);
      }
    }
  }

  // Disabled state
  &--disabled {
    .ui-slider__value {
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
