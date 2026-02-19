<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { navContextKey, type NavOrientation } from './types'

interface Props {
  orientation?: NavOrientation
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})

provide(navContextKey, {
  orientation: toRef(() => props.orientation),
})

const classes = computed(() => [
  'ui-nav',
  `ui-nav--${props.orientation}`,
])
</script>

<template>
  <nav :class="classes" :aria-label="ariaLabel">
    <ul class="ui-nav__list" role="list">
      <slot />
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.ui-nav {
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  &--vertical {
    .ui-nav__list {
      flex-direction: column;
    }
  }

  &--horizontal {
    .ui-nav__list {
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-1);
    }
  }
}
</style>
