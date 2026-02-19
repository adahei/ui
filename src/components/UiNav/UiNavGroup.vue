<script setup lang="ts">
import { computed, provide, inject, useId, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { navContextKey, navGroupContextKey } from './types'
import { useDisclosure } from '../../composables'

interface Props {
  label?: string
  defaultExpanded?: boolean
  collapsible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: true,
  collapsible: true,
})

const navContext = inject(navContextKey)
const isVertical = computed(() => navContext?.orientation.value === 'vertical')

const generatedId = useId()
const groupId = `nav-group-${generatedId}`
const contentId = `nav-group-content-${generatedId}`

const { isOpen: isExpanded, toggle: baseToggle } = useDisclosure({
  defaultOpen: props.defaultExpanded,
})

// Watch for defaultExpanded changes
watch(() => props.defaultExpanded, (val) => {
  isExpanded.value = val
})

function toggle() {
  if (props.collapsible && isVertical.value) {
    baseToggle()
  }
}

provide(navGroupContextKey, {
  isExpanded,
  toggle,
  groupId,
})

const classes = computed(() => [
  'ui-nav-group',
  {
    'ui-nav-group--expanded': isExpanded.value,
    'ui-nav-group--collapsible': props.collapsible && isVertical.value,
    'ui-nav-group--horizontal': !isVertical.value,
  },
])
</script>

<template>
  <li :class="classes">
    <!-- Group header (only for vertical with label) -->
    <template v-if="label && isVertical">
      <button
        v-if="collapsible"
        :id="groupId"
        type="button"
        class="ui-nav-group__header ui-nav-group__header--button"
        :aria-expanded="isExpanded"
        :aria-controls="contentId"
        @click="toggle"
      >
        <span class="ui-nav-group__label">{{ label }}</span>
        <ChevronDown class="ui-nav-group__icon" aria-hidden="true" />
      </button>
      <span v-else :id="groupId" class="ui-nav-group__header">
        <span class="ui-nav-group__label">{{ label }}</span>
      </span>
    </template>

    <!-- Group content -->
    <div class="ui-nav-group__panel">
      <ul
        :id="contentId"
        class="ui-nav-group__content"
        role="list"
        :aria-labelledby="label ? groupId : undefined"
      >
        <slot />
      </ul>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.ui-nav-group {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--spacing-2) var(--spacing-3);
    background: none;
    border: none;
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 600;
    line-height: 1;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &--button {
      cursor: pointer;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--text-secondary);
      }

      &:focus-visible {
        outline: none;
        color: var(--text-primary);
      }
    }
  }

  &__label {
    flex: 1;
    text-align: left;
  }

  &__icon {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
    transition: transform var(--transition-normal);
  }

  &__panel {
    display: grid;
    grid-template-rows: 1fr;
    transition: grid-template-rows var(--transition-normal);
  }

  &__content {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: var(--spacing-3);
    min-height: 0;
    overflow: hidden;
  }

  // Collapsible behavior (vertical only)
  &--collapsible {
    &:not(.ui-nav-group--expanded) {
      .ui-nav-group__panel {
        grid-template-rows: 0fr;
      }

      .ui-nav-group__icon {
        transform: rotate(-90deg);
      }
    }
  }

  // Horizontal layout
  &--horizontal {
    .ui-nav-group__panel {
      display: contents;
    }

    .ui-nav-group__content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-1);
      padding-left: 0;
      overflow: visible;
    }
  }

  // Expanded state
  &--expanded {
    .ui-nav-group__icon {
      transform: rotate(0deg);
    }
  }
}
</style>
