<script setup lang="ts">
import { computed } from 'vue'

export type CardVariant = 'default' | 'elevated' | 'outline' | 'filled' | 'ghost'
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?: CardVariant
  radius?: CardRadius
  shadow?: CardShadow
  padding?: CardPadding
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  radius: 'lg',
  shadow: undefined, // Let variant determine default
  padding: 'md',
})

// Determine effective shadow based on variant if not explicitly set
const effectiveShadow = computed(() => {
  if (props.shadow !== undefined) return props.shadow

  switch (props.variant) {
    case 'elevated':
      return 'lg'
    case 'default':
      return 'sm'
    default:
      return 'none'
  }
})

const classes = computed(() => [
  'ui-card',
  `ui-card--${props.variant}`,
  `ui-card--radius-${props.radius}`,
  `ui-card--shadow-${effectiveShadow.value}`,
  `ui-card--padding-${props.padding}`,
])
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.header" class="ui-card__header">
      <slot name="header" />
    </div>
    <div class="ui-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ui-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-card {
  display: flex;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-height: 0; // Allow body to shrink for overflow in children
    display: flex;
    flex-direction: column;
  }

  &__footer {
    flex-shrink: 0;
  }

  // ==========================================
  // Variants
  // ==========================================

  // Default: border + subtle shadow
  &--default {
    background-color: var(--card-bg, var(--bg-primary));
    border: 1px solid var(--card-border, var(--border-primary));

    .ui-card__header {
      border-bottom: 1px solid var(--card-border, var(--border-primary));
    }

    .ui-card__footer {
      border-top: 1px solid var(--card-border, var(--border-primary));
    }
  }

  // Elevated: no border, stronger shadow
  &--elevated {
    background-color: var(--card-bg, var(--bg-primary));
    border: none;

    .ui-card__header {
      border-bottom: 1px solid var(--card-border, var(--border-primary));
    }

    .ui-card__footer {
      border-top: 1px solid var(--card-border, var(--border-primary));
    }
  }

  // Outline: border only, no shadow, no background
  &--outline {
    background-color: transparent;
    border: 1px solid var(--card-border, var(--border-primary));

    .ui-card__header {
      border-bottom: 1px solid var(--card-border, var(--border-primary));
    }

    .ui-card__footer {
      border-top: 1px solid var(--card-border, var(--border-primary));
    }
  }

  // Filled: solid background, no border
  &--filled {
    background-color: var(--card-filled-bg, var(--bg-secondary));
    border: none;

    .ui-card__header {
      border-bottom: 1px solid var(--card-border, var(--border-primary));
    }

    .ui-card__footer {
      border-top: 1px solid var(--card-border, var(--border-primary));
    }
  }

  // Ghost: invisible container
  &--ghost {
    background-color: transparent;
    border: none;

    .ui-card__header,
    .ui-card__footer {
      border: none;
    }
  }

  // ==========================================
  // Border Radius
  // ==========================================

  &--radius-none {
    border-radius: 0;
  }

  &--radius-sm {
    border-radius: var(--radius-sm);
  }

  &--radius-md {
    border-radius: var(--radius-md);
  }

  &--radius-lg {
    border-radius: var(--radius-lg);
  }

  &--radius-xl {
    border-radius: var(--radius-xl);
  }

  // ==========================================
  // Shadows
  // ==========================================

  &--shadow-none {
    box-shadow: none;
  }

  &--shadow-sm {
    box-shadow: var(--shadow-sm);
  }

  &--shadow-md {
    box-shadow: var(--shadow-md);
  }

  &--shadow-lg {
    box-shadow: var(--shadow-lg);
  }

  &--shadow-xl {
    box-shadow: var(--shadow-xl);
  }

  // ==========================================
  // Padding (using CSS custom property for nesting support)
  // ==========================================

  &--padding-none {
    --ui-card-padding: 0;

    // Remove internal borders when no padding
    > .ui-card__header {
      border-bottom: none;
    }

    > .ui-card__footer {
      border-top: none;
    }
  }

  &--padding-sm {
    --ui-card-padding: var(--spacing-3);
  }

  &--padding-md {
    --ui-card-padding: var(--spacing-4);
  }

  &--padding-lg {
    --ui-card-padding: var(--spacing-6);
  }

  &--padding-xl {
    --ui-card-padding: var(--spacing-8);
  }

  // Apply padding via the custom property
  > .ui-card__header,
  > .ui-card__body,
  > .ui-card__footer {
    padding: var(--ui-card-padding, var(--spacing-4));
  }
}
</style>
