<script setup lang="ts">
import { computed, ref } from 'vue'
import { ImageOff } from 'lucide-vue-next'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none'
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  /** Image source URL */
  src?: string
  /** Alt text */
  alt?: string
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string
  /** Object fit */
  fit?: ImageFit
  /** Border radius */
  radius?: ImageRadius
  /** Make image clickable */
  clickable?: boolean
  /** Show fallback on error */
  fallback?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  fit: 'cover',
  radius: 'none',
  clickable: false,
  fallback: true,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  load: []
  error: []
}>()

const isLoading = ref(true)
const hasError = ref(false)

const imageKey = computed(() => props.src)

function onLoad() {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

function onError() {
  isLoading.value = false
  hasError.value = true
  emit('error')
}

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}

const classes = computed(() => [
  'ui-image',
  `ui-image--${props.fit}`,
  `ui-image--radius-${props.radius}`,
  {
    'ui-image--clickable': props.clickable,
    'ui-image--loading': isLoading.value,
    'ui-image--error': hasError.value,
  },
])

const style = computed(() => {
  const styles: Record<string, string> = {}
  if (props.aspectRatio) {
    styles.aspectRatio = props.aspectRatio
  }
  return styles
})
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :class="classes"
    :style="style"
    :type="clickable ? 'button' : undefined"
    @click="handleClick"
  >
    <img
      v-if="src && !hasError"
      :key="imageKey"
      :src="src"
      :alt="alt"
      class="ui-image__img"
      @load="onLoad"
      @error="onError"
    />

    <div v-if="hasError && fallback" class="ui-image__fallback">
      <slot name="fallback">
        <ImageOff />
      </slot>
    </div>

    <div v-if="isLoading && src" class="ui-image__loading">
      <slot name="loading">
        <div class="ui-image__skeleton" />
      </slot>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.ui-image {
  position: relative;
  display: block;
  overflow: hidden;
  background-color: var(--bg-tertiary);

  // Reset button styles when clickable
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 4rem;
    color: var(--text-tertiary);

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--bg-tertiary) 25%,
      var(--bg-secondary) 50%,
      var(--bg-tertiary) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  // Fit
  &--cover .ui-image__img {
    object-fit: cover;
  }

  &--contain .ui-image__img {
    object-fit: contain;
  }

  &--fill .ui-image__img {
    object-fit: fill;
  }

  &--none .ui-image__img {
    object-fit: none;
  }

  // Radius
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

  &--radius-full {
    border-radius: var(--radius-full);
  }

  // Clickable
  &--clickable {
    cursor: pointer;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);

    &:hover {
      transform: scale(1.02);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:active {
      transform: scale(0.99);
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
