<script setup lang="ts">
import { computed } from 'vue'
import { Info, AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-vue-next'
import type { Status } from '@/types'

export type AlertVariant = Status | 'neutral'

interface Props {
  /** Alert variant/status */
  variant?: AlertVariant
  /** Alert title */
  title?: string
  /** Show close button */
  dismissible?: boolean
  /** Hide the icon */
  hideIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: false,
  hideIcon: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  neutral: Info,
}

const icon = computed(() => iconMap[props.variant])

const classes = computed(() => [
  'ui-alert',
  `ui-alert--${props.variant}`,
])

function handleDismiss() {
  emit('dismiss')
}
</script>

<template>
  <div :class="classes" role="alert">
    <component
      :is="icon"
      v-if="!hideIcon"
      class="ui-alert__icon"
      aria-hidden="true"
    />

    <div class="ui-alert__content">
      <div v-if="title" class="ui-alert__title">{{ title }}</div>
      <div v-if="$slots.default" class="ui-alert__message">
        <slot />
      </div>
      <div v-if="$slots.actions" class="ui-alert__actions">
        <slot name="actions" />
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="ui-alert__close"
      aria-label="Dismiss"
      @click="handleDismiss"
    >
      <X />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.ui-alert {
  display: flex;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;

  &__icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.125rem;
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  &__title {
    font-weight: var(--font-medium);
    font-size: var(--text-sm);
    line-height: var(--leading-tight);
  }

  &__message {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    opacity: 0.9;
  }

  &__actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-2);
  }

  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: none;
    background: transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);

    &:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  // Variants
  &--info {
    background-color: var(--alert-info-bg, var(--color-blue-50));
    border-color: var(--alert-info-border, var(--color-blue-200));
    color: var(--alert-info-text, var(--color-blue-800));

    .ui-alert__icon {
      color: var(--alert-info-icon, var(--color-blue-500));
    }
  }

  &--success {
    background-color: var(--alert-success-bg, var(--color-green-50));
    border-color: var(--alert-success-border, var(--color-green-200));
    color: var(--alert-success-text, var(--color-green-800));

    .ui-alert__icon {
      color: var(--alert-success-icon, var(--color-green-500));
    }
  }

  &--warning {
    background-color: var(--alert-warning-bg, var(--color-amber-50));
    border-color: var(--alert-warning-border, var(--color-amber-200));
    color: var(--alert-warning-text, var(--color-amber-800));

    .ui-alert__icon {
      color: var(--alert-warning-icon, var(--color-amber-500));
    }
  }

  &--error {
    background-color: var(--alert-error-bg, var(--color-red-50));
    border-color: var(--alert-error-border, var(--color-red-200));
    color: var(--alert-error-text, var(--color-red-800));

    .ui-alert__icon {
      color: var(--alert-error-icon, var(--color-red-500));
    }
  }

  &--neutral {
    background-color: var(--alert-neutral-bg, var(--bg-secondary));
    border-color: var(--alert-neutral-border, var(--border-primary));
    color: var(--alert-neutral-text, var(--text-primary));

    .ui-alert__icon {
      color: var(--alert-neutral-icon, var(--text-secondary));
    }
  }
}

// Dark mode adjustments
:root[data-theme='dark'] {
  .ui-alert {
    &--info {
      background-color: var(--alert-info-bg, rgba(59, 130, 246, 0.15));
      border-color: var(--alert-info-border, rgba(59, 130, 246, 0.3));
      color: var(--alert-info-text, var(--color-blue-200));
    }

    &--success {
      background-color: var(--alert-success-bg, rgba(34, 197, 94, 0.15));
      border-color: var(--alert-success-border, rgba(34, 197, 94, 0.3));
      color: var(--alert-success-text, var(--color-green-200));
    }

    &--warning {
      background-color: var(--alert-warning-bg, rgba(245, 158, 11, 0.15));
      border-color: var(--alert-warning-border, rgba(245, 158, 11, 0.3));
      color: var(--alert-warning-text, var(--color-amber-200));
    }

    &--error {
      background-color: var(--alert-error-bg, rgba(239, 68, 68, 0.15));
      border-color: var(--alert-error-border, rgba(239, 68, 68, 0.3));
      color: var(--alert-error-text, var(--color-red-200));
    }

    .ui-alert__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
