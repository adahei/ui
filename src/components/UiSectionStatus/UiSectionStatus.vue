<script setup lang="ts">
import { computed } from 'vue'

export type SectionStatusState = 'default' | 'changed' | 'error' | 'success'

interface Props {
  /** The section/item label text */
  label?: string
  /** Visual status state affecting border/background color */
  status?: SectionStatusState
  /** Whether the item is in a loading state (reduces opacity) */
  loading?: boolean
  /** Visual disabled state */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'default',
  loading: false,
  disabled: false,
})

const classes = computed(() => [
  'ui-section-status',
  `ui-section-status--${props.status}`,
  {
    'ui-section-status--loading': props.loading,
    'ui-section-status--disabled': props.disabled,
  },
])
</script>

<template>
  <div
    :class="classes"
    role="group"
    :aria-label="label"
    :aria-disabled="disabled || undefined"
  >
    <span class="ui-section-status__label">
      <slot>{{ label }}</slot>
    </span>

    <div v-if="$slots.badges" class="ui-section-status__badges">
      <slot name="badges" />
    </div>

    <div v-if="$slots.actions" class="ui-section-status__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-section-status {
  container: section-status / inline-size;
  display: grid;
  grid-template-areas: "label badges actions";
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);

  &__label {
    grid-area: label;
    min-width: 0;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__badges {
    grid-area: badges;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
    align-items: center;
  }

  &__actions {
    grid-area: actions;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
    align-items: center;
  }

  // Status states
  &--changed {
    border-color: var(--status-warning);
    background-color: color-mix(in srgb, var(--status-warning) 10%, transparent);
  }

  &--error {
    border-color: var(--status-error);
    background-color: color-mix(in srgb, var(--status-error) 10%, transparent);
  }

  &--success {
    border-color: var(--status-success);
    background-color: color-mix(in srgb, var(--status-success) 10%, transparent);
  }

  // Loading state
  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }

  // Disabled state
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  // Container query for narrow layout
  @container section-status (max-width: 320px) {
    grid-template-areas:
      "label actions"
      "badges actions";
    grid-template-columns: 1fr auto;

    .ui-section-status__badges {
      flex-direction: column;
      align-items: flex-start;
    }

    .ui-section-status__actions {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>
