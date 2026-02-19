<script setup lang="ts">
import { computed } from 'vue'

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type StackGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

interface Props {
  /** Flex direction */
  direction?: StackDirection
  /** Gap between items (maps to --spacing-*) */
  gap?: StackGap
  /** Align items (cross axis) */
  align?: StackAlign
  /** Justify content (main axis) */
  justify?: StackJustify
  /** Flex wrap */
  wrap?: StackWrap
  /** Use inline-flex instead of flex */
  inline?: boolean
  /** HTML element to render as */
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'column',
  gap: '4',
  align: 'stretch',
  justify: 'start',
  wrap: 'nowrap',
  inline: false,
  as: 'div',
})

const classes = computed(() => [
  'ui-stack',
  `ui-stack--direction-${props.direction}`,
  `ui-stack--gap-${props.gap}`,
  `ui-stack--align-${props.align}`,
  `ui-stack--justify-${props.justify}`,
  `ui-stack--wrap-${props.wrap}`,
  {
    'ui-stack--inline': props.inline,
  },
])
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.ui-stack {
  display: flex;

  // Inline
  &--inline {
    display: inline-flex;
  }

  // Direction
  &--direction-row {
    flex-direction: row;
  }

  &--direction-column {
    flex-direction: column;
  }

  &--direction-row-reverse {
    flex-direction: row-reverse;
  }

  &--direction-column-reverse {
    flex-direction: column-reverse;
  }

  // Gap
  &--gap-0 {
    gap: 0;
  }

  &--gap-1 {
    gap: var(--spacing-1);
  }

  &--gap-2 {
    gap: var(--spacing-2);
  }

  &--gap-3 {
    gap: var(--spacing-3);
  }

  &--gap-4 {
    gap: var(--spacing-4);
  }

  &--gap-5 {
    gap: var(--spacing-5);
  }

  &--gap-6 {
    gap: var(--spacing-6);
  }

  &--gap-8 {
    gap: var(--spacing-8);
  }

  &--gap-10 {
    gap: var(--spacing-10);
  }

  &--gap-12 {
    gap: var(--spacing-12);
  }

  &--gap-16 {
    gap: var(--spacing-16);
  }

  // Align
  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-stretch {
    align-items: stretch;
  }

  &--align-baseline {
    align-items: baseline;
  }

  // Justify
  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-between {
    justify-content: space-between;
  }

  &--justify-around {
    justify-content: space-around;
  }

  &--justify-evenly {
    justify-content: space-evenly;
  }

  // Wrap
  &--wrap-nowrap {
    flex-wrap: nowrap;
  }

  &--wrap-wrap {
    flex-wrap: wrap;
  }

  &--wrap-wrap-reverse {
    flex-wrap: wrap-reverse;
  }
}
</style>
