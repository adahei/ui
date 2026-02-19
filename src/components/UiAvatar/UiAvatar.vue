<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { User } from 'lucide-vue-next'
import UiImage from '../UiImage/UiImage.vue'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarShape = 'circle' | 'rounded'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
  alt: '',
  clickable: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}

const imageError = ref(false)

// Reset error state when src changes
watch(() => props.src, () => {
  imageError.value = false
})

const showImage = computed(() => props.src && !imageError.value)
const showInitials = computed(() => !showImage.value && props.name)

const initials = computed(() => {
  if (!props.name) return ''

  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) {
    // Single word: take first two characters
    return parts[0].substring(0, 2).toUpperCase()
  }
  // Multiple words: take first character of first two words
  return (parts[0][0] + parts[1][0]).toUpperCase()
})

function onImageError() {
  imageError.value = true
}

const classes = computed(() => [
  'ui-avatar',
  `ui-avatar--${props.size}`,
  `ui-avatar--${props.shape}`,
  {
    'ui-avatar--clickable': props.clickable,
  },
])
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    :class="classes"
    :type="clickable ? 'button' : undefined"
    @click="handleClick"
  >
    <UiImage
      v-if="showImage"
      :src="src"
      :alt="alt || name || 'Avatar'"
      :fallback="false"
      fit="cover"
      class="ui-avatar__image"
      @error="onImageError"
    />
    <span v-else-if="showInitials" class="ui-avatar__initials">
      {{ initials }}
    </span>
    <span v-else class="ui-avatar__fallback" aria-hidden="true">
      <User />
    </span>
  </component>
</template>

<style lang="scss" scoped>
.ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  background-color: var(--avatar-bg, var(--bg-tertiary));
  color: var(--avatar-text, var(--text-secondary));
  font-weight: 500;
  vertical-align: middle;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    line-height: 1;
    user-select: none;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    svg {
      width: 50%;
      height: 50%;
    }
  }

  // Shapes
  &--circle {
    border-radius: var(--radius-full);
  }

  &--rounded {
    border-radius: var(--radius-md);
  }

  // Clickable
  &--clickable {
    cursor: pointer;
    border: none;
    padding: 0;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);

    &:hover {
      transform: scale(1.05);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  // Sizes
  &--sm {
    width: 2rem;
    height: 2rem;
    font-size: var(--text-xs);
  }

  &--md {
    width: 4rem;
    height: 4rem;
    font-size: var(--text-lg);
  }

  &--lg {
    width: 12rem;
    height: 12rem;
    font-size: var(--text-4xl);
  }
}
</style>
